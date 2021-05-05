import { Field, InputType } from "type-graphql";

@InputType()
export class AddCommentInput {
  @Field()
  courseInitials!: string;

  @Field()
  content!: string;

  @Field(() => String, { nullable: true })
  parentId: string | null;
}
