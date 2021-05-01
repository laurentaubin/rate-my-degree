import { Button, ButtonProps } from "@chakra-ui/button";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin, useGoogleLogout } from "react-google-login";
import { refreshTokenSetup } from "../utils/refreshTokenSetup";
import GoogleIcon from "./icons/GoogleIcon";

interface GoogleLoginProps extends ButtonProps {
  loggedIn: boolean;
}

export const GoogleLogin: React.FC<GoogleLoginProps> = ({ loggedIn, ...props }) => {
  const [_, setCookies, removeCookie] = useCookies(["auth-token"]);

  const onLoginSucess = (googleUser: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const idToken = (googleUser as GoogleLoginResponse).getAuthResponse().id_token;
    setCookies("auth-token", idToken);

    refreshTokenSetup(googleUser as GoogleLoginResponse);

    // router.reload();
  };

  const onLogoutSuccess = () => {
    removeCookie("auth-token");
  };

  const { signIn, loaded } = useGoogleLogin({
    onSuccess: onLoginSucess,
    clientId: "793031041520-uqdil8vfvdss6lpt8c1fjrg6jj7u60v3.apps.googleusercontent.com",
    isSignedIn: true
  });

  const { signOut } = useGoogleLogout({
    onLogoutSuccess: onLogoutSuccess,
    clientId: "793031041520-uqdil8vfvdss6lpt8c1fjrg6jj7u60v3.apps.googleusercontent.com"
  });

  return loggedIn ? (
    <Button {...props} onClick={signOut}>
      Déconnexion
    </Button>
  ) : (
    <Button {...props} leftIcon={<GoogleIcon />} onClick={signIn}>
      Connexion avec Google
    </Button>
  );
};
