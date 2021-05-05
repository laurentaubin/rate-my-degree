import { Field, InputType } from "type-graphql";

@InputType()
export class CourseInput {
  @Field()
  initials!: string;
}
