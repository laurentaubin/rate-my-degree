import { useRouter } from "next/router";
import React from "react";
import { useCookies } from "react-cookie";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { useMeQuery } from "../generated/graphql";
import { findDateSixMonthsInTheFuture } from "../utils/findDateSixMonthsInTheFuture";

const Login = () => {
  const [_, setCookies] = useCookies(["auth-token"]);
  const router = useRouter();

  const [{ data }] = useMeQuery();

  console.log(data);

  const onLoginSucess = (googleUser: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const idToken = (googleUser as GoogleLoginResponse).getAuthResponse().id_token;
    setCookies("auth-token", idToken, { expires: findDateSixMonthsInTheFuture() });
    router.reload();
  };

  return (
    <>
      <GoogleLogin clientId={"793031041520-uqdil8vfvdss6lpt8c1fjrg6jj7u60v3.apps.googleusercontent.com"} onSuccess={onLoginSucess} />
    </>
  );
};

export default Login;
