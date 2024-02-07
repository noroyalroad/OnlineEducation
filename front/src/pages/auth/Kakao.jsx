import React from "react";
import KakaoLogin from "react-kakao-login";
import { kakao } from "../../_actions/user_action";
const jskey = process.env.REACT_APP_KAKAOJSKEY;
const Kakao = () => {
  const oauthhandler = (data) => {
    const { id } = data.profile;
    const { email } = data.profile.kakao_account;
    const { nickname, profile_image } = data.profile.properties;

    console.log(data);

    let body = {
      id,
      email,
      nickname,
      profile_image,
    };

    console.log(body);

    kakao(body).then((res) => {
      console.log(res);
    });
    console.log(data);
  };
  return (
    <>
      <KakaoLogin token={jskey} buttonText="kakao" onSuccess={oauthhandler} onFail={console.error}>
        카캌오로그인
      </KakaoLogin>
    </>
  );
};

export default Kakao;
