import { InputType, Field } from "type-graphql";

@InputType()
export class AddCommentInput {
  @Field()
  courseInitials!: string;

  @Field()
  content!: string;
}
