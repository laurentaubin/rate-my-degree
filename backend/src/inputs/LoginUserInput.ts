import { InputType, Field } from "type-graphql";

@InputType()
export class LoginUserInput {
  @Field()
  id!: string;
}
