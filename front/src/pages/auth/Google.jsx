import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from "js-cookie";
import { google } from "../../_actions/user_action";
import config from "../../config/google";
const Google = () => {
  const responseGoogle = (response) => {
    console.log(response);
    Cookies.set("x_auth", response.credential);

    google().then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <GoogleOAuthProvider clientId={config.GOOGLE_CI}>
        <GoogleLogin buttonText="구글로그인" onSuccess={responseGoogle} onFailure={responseGoogle} cookiePolicy={"single_host_origin"} />
      </GoogleOAuthProvider>
    </>
  );
};

export default Google;
