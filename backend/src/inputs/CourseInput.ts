import { InputType, Field } from "type-graphql";

@InputType()
class SortBy {
  @Field()
  attribute: string;

  @Field()
  order: "ASC" | "DESC";
}

@InputType()
export class CourseInput {
  @Field()
  initials!: string;

  @Field()
  sortBy!: SortBy;
}
