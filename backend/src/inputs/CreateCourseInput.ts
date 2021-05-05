import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCourseInput {
  @Field()
  initials!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  professor!: string;
}
