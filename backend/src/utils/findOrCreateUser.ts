import { OAuth2Client, TokenPayload } from "google-auth-library";
import { User } from "../entities/User";

const oauthClient = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

export const findOrCreateUser = async (authToken: string): Promise<User | undefined> => {
  const googleUser = await verifyAuthToken(authToken);

  const { email, name, picture } = googleUser!;
  const user = await doesUserExist(email!);

  return user ? user : createUser(email!, name!, picture!);
};

const verifyAuthToken = async (authToken: string): Promise<TokenPayload | undefined> => {
  try {
    const ticket = await oauthClient.verifyIdToken({ idToken: authToken, audience: process.env.GOOGLE_OAUTH_CLIENT_ID });
    return ticket.getPayload();
  } catch (error) {
    console.error(`Error verifying token ${authToken}`);
    return undefined;
  }
};

const doesUserExist = async (email: string): Promise<User | undefined> => {
  return await User.findOne({ where: { email: email } });
};

const createUser = async (email: string, name: string, pictureUrl: string): Promise<User> => {
  const user = User.create({ email, name, pictureUrl, comments: [] });
  return await User.save(user);
};
