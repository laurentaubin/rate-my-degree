import { Resolver, Query, Ctx } from "type-graphql";

import { User } from "../entities/User";
import { MyContext } from "../types";

@Resolver((_of) => User)
export class UserResolver {
  @Query(() => User)
  async me(@Ctx() { currentUser }: MyContext): Promise<User | undefined | Error> {
    if (!currentUser) {
      return Error("User is unauthenticated");
    }

    return currentUser;
  }
}
