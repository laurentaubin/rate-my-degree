import { InputType, Field } from "type-graphql";

@InputType()
export class CourseInput {
  @Field()
  initials!: string;
}
