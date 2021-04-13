import { CourseComment } from "../entities/CourseComment";
import { VoteInput } from "../inputs/VoteInput";
import { Resolver, Mutation, Arg, FieldResolver, Root } from "type-graphql";
import { getConnection } from "typeorm";

@Resolver((_of) => CourseComment)
export class CommentResolver {
  @FieldResolver((_of) => CourseComment)
  subComments(@Root() comment: CourseComment) {
    return CourseComment.find({ where: { parentId: comment.id } });
  }

  @FieldResolver()
  isSubComment(@Root() comment: CourseComment): boolean {
    return comment.parentId != null;
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
}
