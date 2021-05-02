import { CourseComment } from "../entities/CourseComment";
import { VoteInput } from "../inputs/VoteInput";
import { Resolver, Mutation, Arg, FieldResolver, Root, Ctx } from "type-graphql";
import { getConnection } from "typeorm";
import { AppContext } from "../types";
import { verifyUserIsAuthenticated } from "../utils/verifyUserIsAuthenticated";
import { User } from "../entities/User";
import { ForbiddenError } from "apollo-server-errors";

@Resolver((_of) => CourseComment)
export class CommentResolver {
  @FieldResolver((_of) => CourseComment)
  subComments(@Root() comment: CourseComment): Promise<CourseComment[]> {
    return CourseComment.find({ where: { parentId: comment.id } });
  }

  @FieldResolver((_of) => CourseComment)
  isUserAuthor(@Ctx() { currentUser }: AppContext, @Root() comment: CourseComment): Boolean {
    if (!currentUser) {
      return false;
    }

    return currentUser.id === comment.author.id;
  }

  @Mutation(() => CourseComment)
  async vote(@Arg("data") data: VoteInput): Promise<CourseComment | undefined> {
    const { score, commentId } = data;

    await getConnection()
      .createQueryBuilder()
      .update(CourseComment)
      .set({
        score: () => `score + ${score}`,
      })
      .where("course_comment.id = :id", { id: commentId })
      .execute();

    return CourseComment.findOne({ where: { id: commentId } });
  }

  @Mutation(() => Boolean)
  async deleteComment(@Ctx() { currentUser }: AppContext, @Arg("commentId") commentId: string): Promise<Boolean> {
    verifyUserIsAuthenticated(currentUser);
    verifyUserIsCommentAuthor(currentUser, commentId);

    await getConnection()
      .getRepository(CourseComment)
      .createQueryBuilder()
      .delete()
      .where("course_comment.id = :id", { id: commentId })
      .execute();

    return true;
  }
}

const verifyUserIsCommentAuthor = async (user: User, commentId: string) => {
  const comment = await CourseComment.findOne({ where: { id: commentId } });

  if (comment?.author.id != user.id) {
    throw new ForbiddenError("User is not the comment's author");
  }
};
