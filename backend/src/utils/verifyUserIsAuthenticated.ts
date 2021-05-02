import { AuthenticationError } from "apollo-server-errors";
import { User } from "../entities/User";

export const verifyUserIsAuthenticated = (user: User): void => {
  if (!user) {
    throw new AuthenticationError("User is not authenticated");
  }
};
