import { Button, ButtonProps } from "@chakra-ui/button";
import { useRouter } from "next/router";
import React from "react";
import { useCookies } from "react-cookie";
import { GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin, useGoogleLogout } from "react-google-login";
import { refreshTokenSetup } from "@utils/refreshTokenSetup";
import GoogleIcon from "@components/icons/GoogleIcon";

interface GoogleLoginProps extends ButtonProps {}

export const GoogleLogin: React.FC<GoogleLoginProps> = ({ ...props }) => {
  const [cookies, setCookies, removeCookie] = useCookies(["auth-token"]);
  const router = useRouter();

  const onLoginSucess = (googleUser: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const idToken = (googleUser as GoogleLoginResponse).getAuthResponse().id_token;
    setCookies("auth-token", idToken, { path: "/" });

    refreshTokenSetup(googleUser as GoogleLoginResponse);

    router.reload();
  };

  const onLogoutSuccess = () => {
    removeCookie("auth-token", { path: "/" });
    router.reload();
  };

  const { signIn, loaded } = useGoogleLogin({
    onSuccess: onLoginSucess,
    clientId: "793031041520-uqdil8vfvdss6lpt8c1fjrg6jj7u60v3.apps.googleusercontent.com",
  });

  const { signOut } = useGoogleLogout({
    onLogoutSuccess: onLogoutSuccess,
    clientId: "793031041520-uqdil8vfvdss6lpt8c1fjrg6jj7u60v3.apps.googleusercontent.com",
  });

  return cookies["auth-token"] ? (
    <Button {...props} onClick={signOut}>
      Déconnexion
    </Button>
  ) : (
    <Button {...props} leftIcon={<GoogleIcon />} onClick={signIn}>
      Connexion
    </Button>
  );
};
