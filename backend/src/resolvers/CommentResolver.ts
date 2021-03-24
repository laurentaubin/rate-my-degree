import { CourseComment } from "../entities/CourseComment";
import { VoteInput } from "../inputs/VoteInput";
import { Resolver, Mutation, Arg } from "type-graphql";
import { getConnection } from "typeorm";

@Resolver()
export class CommentResolver {
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
