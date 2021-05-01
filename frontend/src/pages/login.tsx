import { useRouter } from "next/router";
import React from "react";
import { useCookies } from "react-cookie";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { useMeQuery } from "../generated/graphql";
import { refreshTokenSetup } from "../utils/refreshTokenSetup";

const Login = () => {
  const [_, setCookies] = useCookies(["auth-token"]);
  const router = useRouter();

  const [{ data }] = useMeQuery();

  console.log(data);

  const onLoginSucess = (googleUser: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const idToken = (googleUser as GoogleLoginResponse).getAuthResponse().id_token;
    setCookies("auth-token", idToken);

    refreshTokenSetup(googleUser as GoogleLoginResponse);

    // router.reload();
  };

  return (
    <>
      <GoogleLogin
        clientId={"793031041520-uqdil8vfvdss6lpt8c1fjrg6jj7u60v3.apps.googleusercontent.com"}
        onSuccess={onLoginSucess}
        isSignedIn={true}
        buttonText=""
      />
    </>
  );
};

export default Login;
