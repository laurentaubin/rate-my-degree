import { ForbiddenError } from "apollo-server-errors";
import { Arg, Ctx, FieldResolver, Mutation, Resolver, Root } from "type-graphql";
import { getConnection } from "typeorm";
import { CourseComment } from "../entities/CourseComment";
import { User } from "../entities/User";
import { Vote } from "../entities/Vote";
import { VoteInput } from "../inputs/VoteInput";
import { AppContext } from "../types";
import { verifyUserIsAuthenticated } from "../utils/verifyUserIsAuthenticated";

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

  @FieldResolver((_of) => CourseComment)
  async userVote(@Ctx() { currentUser }: AppContext, @Root() comment: CourseComment): Promise<Number> {
    if (!currentUser) {
      return 0;
    }

    const vote = await Vote.findOne({ where: { comment: comment.id, user: currentUser.id } });

    if (!vote) {
      return 0;
    }

    return vote.score;
  }

  @Mutation(() => CourseComment)
  async vote(@Ctx() { currentUser }: AppContext, @Arg("data") data: VoteInput): Promise<CourseComment | undefined> {
    verifyUserIsAuthenticated(currentUser);

    const { score, commentId } = data;

    await getConnection()
      .createQueryBuilder()
      .update(CourseComment)
      .set({
        score: () => `score + ${score}`,
      })
      .where("course_comment.id = :id", { id: commentId })
      .execute();

    const comment = await CourseComment.findOne({ where: { id: commentId } });
    await upsertVote(comment!, score, currentUser);

    return comment;
  }

  @Mutation(() => Boolean)
  async deleteComment(@Ctx() { currentUser }: AppContext, @Arg("commentId") commentId: string): Promise<Boolean> {
    verifyUserIsAuthenticated(currentUser);
    verifyUserIsCommentAuthor(currentUser, commentId);

    const comment = await CourseComment.findOne({ where: { id: commentId } });
    const subComments = await this.subComments(comment!);

    if (subComments.length > 0) {
      const deletedAuthor = await findOrCreateDeletedUser();
      await getConnection()
        .createQueryBuilder()
        .update(CourseComment)
        .set({ content: "[deleted]", author: deletedAuthor })
        .where({ id: commentId })
        .execute();
      return true;
    }

    await getConnection()
      .getRepository(CourseComment)
      .createQueryBuilder()
      .delete()
      .where("course_comment.id = :id", { id: commentId })
      .execute();

    this.cleanUpParent({ currentUser }, comment!);

    return true;
  }

  async cleanUpParent({ currentUser }: AppContext, comment: CourseComment) {
    const parentComment = await CourseComment.findOne({ where: { id: comment.parentId } });

    if (parentComment?.author.email === "deleted") {
      this.deleteComment({ currentUser }, parentComment.id);
    }
  }
}

const verifyUserIsCommentAuthor = async (user: User, commentId: string) => {
  const comment = await CourseComment.findOne({ where: { id: commentId } });

  if (comment?.author.id != user.id) {
    throw new ForbiddenError("User is not the comment's author");
  }
};

const findOrCreateDeletedUser = async () => {
  const user = await User.findOne({ where: { email: "deleted" } });

  if (user) {
    return user;
  }

  const newUser = User.create({
    email: "deleted",
    name: "",
    pictureUrl: "https://i.ibb.co/Pw6SW57/default-avatar.png",
    comments: [],
  });
  return await User.save(newUser);
};
const upsertVote = async (comment: CourseComment, score: number, currentUser: User) => {
  const update = await getConnection()
    .createQueryBuilder()
    .update(Vote)
    .set({ score: () => `score + ${score}` })
    .where("comment_id = :commentId AND user_id = :userId", { commentId: comment.id, userId: currentUser.id })
    .execute();

  if (update.affected === 0) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Vote)
      .values({ comment: comment, score: score, user: currentUser })
      .orUpdate({ conflict_target: ["id"], overwrite: ["score"] })
      .execute();
  }
};
