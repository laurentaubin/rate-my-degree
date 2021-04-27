import { Resolver, Query, Mutation, Arg, Root } from "type-graphql";
import { User } from "src/entities/User";
import { RegisterUserInput } from "src/inputs/RegisterUserInput";
import { sign } from "jsonwebtoken";

@Resolver((_of) => User)
export class UserResolver {
  @Mutation(() => String)
  async register(@Arg("data") data: RegisterUserInput): Promise<String> {
    const user = User.create({ ...data, comments: [] });
    await User.save(user);

    return sign({ id: data.id }, process.env.JWT_SECRET, { expiresIn: "1y" });
  }

  @Mutation(() => String)
  async login(@Arg("data") data: LoginUserInput);
}
