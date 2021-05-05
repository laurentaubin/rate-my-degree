import { GoogleLoginResponse } from "react-google-login";

const ONE_HOUR_IN_SECONDS = 60 * 60;

export const refreshTokenSetup = (googleUser: GoogleLoginResponse) => {
  let refreshTiming = (googleUser.tokenObj.expires_in || ONE_HOUR_IN_SECONDS) * 1000;

  const refreshToken = async () => {
    const newToken = await googleUser.reloadAuthResponse();
    refreshTiming = newToken.expires_in || ONE_HOUR_IN_SECONDS * 1000;

    setTimeout(refreshToken, refreshTiming);
  };

  setTimeout(refreshTokenSetup, refreshTiming);
};
