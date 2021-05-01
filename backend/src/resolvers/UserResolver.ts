import { Resolver, Query, Ctx } from "type-graphql";
import { AuthenticationError } from "apollo-server-errors";

import { User } from "../entities/User";
import { MyContext } from "../types";
import { findOrCreateUser } from "../utils/findOrCreateUser";

@Resolver((_of) => User)
export class UserResolver {
  @Query(() => User)
  async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    const authToken = req.cookies["auth-token"];
    if (authToken) {
      const user = await findOrCreateUser(authToken);
      return user;
    }
    throw new AuthenticationError(`Authentication failed with token ${authToken}`);
  }
}
