import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { AppContext } from "../types";
import { verifyUserIsAuthenticated } from "../utils/verifyUserIsAuthenticated";

@Resolver((_of) => User)
export class UserResolver {
  @Query(() => User)
  async me(@Ctx() { currentUser }: AppContext): Promise<User | undefined> {
    verifyUserIsAuthenticated(currentUser);

    return currentUser;
  }
}
