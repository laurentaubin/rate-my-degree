import { verifyUserIsAuthenticated } from "src/utils/verifyUserIsAuthenticated";
import { Resolver, Query, Ctx } from "type-graphql";

import { User } from "../entities/User";
import { MyContext } from "../types";

@Resolver((_of) => User)
export class UserResolver {
  @Query(() => User)
  async me(@Ctx() { currentUser }: MyContext): Promise<User | undefined> {
    verifyUserIsAuthenticated(currentUser);

    return currentUser;
  }
}
