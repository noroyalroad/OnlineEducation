import React, { useState } from "react";
import "../auth/register.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { emailcheck } from "../../_actions/user_action";
const Emailcheck = () => {
  const location = useLocation();
  const email = location.state.email;
  const name = location.state.name;
  console.log(location.state);

  const [message, setMessage] = useState("");

  const handleEmailCheck = () => {
    let body = {
      email: email,
    };
    emailcheck(body).then((res) => {
      console.log(res);
      setMessage(res.message);
    });
  };

  return (
    <div>
      <div className="signup-complete-container">
        <h1 className="title">회원가입이 완료되었습니다!</h1>
        <p className="subtitle">이메일 인증을 위해 아래 버튼을 클릭하세요.</p>
        {message && <p className="verification-message">{message}</p>}
        <button className="verification-button" onClick={handleEmailCheck}>
          이메일 인증하기
        </button>
      </div>
    </div>
  );
};

export default Emailcheck;
