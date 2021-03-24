import { InputType, Field } from "type-graphql";

@InputType()
export class VoteInput {
  @Field()
  commentId!: string;

  @Field()
  score!: number;
}
