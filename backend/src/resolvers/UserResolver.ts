import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";
import { AuthenticationError } from "apollo-server-errors";
import { findOrCreateUser } from "../utils/findOrCreateUser";

@Resolver((_of) => User)
export class UserResolver {
  @Query(() => User)
  async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    const authToken = req.headers.authorization!;
    if (authToken) {
      return await findOrCreateUser(authToken);
    }
    throw new AuthenticationError(`Authentication failed with token ${authToken}`);
  }
}
