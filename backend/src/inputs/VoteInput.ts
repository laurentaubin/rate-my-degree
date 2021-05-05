import { Field, InputType } from "type-graphql";

@InputType()
export class VoteInput {
  @Field()
  commentId!: string;

  @Field()
  score!: number;
}
