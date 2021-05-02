import { CourseComment } from "../entities/CourseComment";
import { VoteInput } from "../inputs/VoteInput";
import { Resolver, Mutation, Arg, FieldResolver, Root } from "type-graphql";
import { getConnection } from "typeorm";

@Resolver((_of) => CourseComment)
export class CommentResolver {
  @FieldResolver((_of) => CourseComment)
  subComments(@Root() comment: CourseComment): Promise<CourseComment[]> {
    return CourseComment.find({ where: { parentId: comment.id } });
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
  async delete(@Arg("commentId") commentId: string): Promise<Boolean> {
    await getConnection()
      .getRepository(CourseComment)
      .createQueryBuilder()
      .delete()
      .where("course_comment.id = :id", { id: commentId })
      .execute();

    return true;
  }
}
