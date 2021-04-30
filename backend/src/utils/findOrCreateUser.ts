import { OAuth2Client, TokenPayload } from "google-auth-library";
import { User } from "../entities/User";

const oauthClient = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

export const findOrCreateUser = async (authToken: string): Promise<User | undefined> => {
  const googleUser = await verifyAuthToken(authToken);

  const { email, name, picture } = googleUser!;

  if (doesUserExist(email!)) {
    return User.findOne({ where: { email: email } });
  }
  const user = User.create({ email, name, pictureUrl: picture, comments: [] });
  return await User.save(user);
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

const doesUserExist = (email: string): boolean => {
  const user = User.findOne({ where: { email: email } });

  return !!user;
};
