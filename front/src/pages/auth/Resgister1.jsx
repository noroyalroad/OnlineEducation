import React, { useEffect, useState } from "react";
import "../auth/register.scss";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const { registerUser, uniquenickname, uniqueemail } = require("../../_actions/user_action");

const Resgister1 = () => {
  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const [isValidate, setIsValidate] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    nickname: false,
  });

  const [isUnique, setIsUnique] = useState({
    email: true,
    nickname: true,
  });

  const usernameHandler = (e) => {
    e.preventDefault();
    const username = e.target.value;
    setform({ ...form, username: e.target.value });
  };

  const nameisValid = () => {
    const isValid = /([^가-힣\x20])/i.test(form.username);
    const isValid2 = /^[a-zA-Z0-9]+$/.test(form.username);
    const isValidlength = form.username.length >= 2 && form.username.length <= 10;
    const containsSpace = form.username.includes(" "); // !containsSpace
    const containsSpecial = /[~!@#$%^&*()_+|<>?:{}]/.test(form.username);

    console.log(!isValid, !isValid2, isValidlength, !containsSpace, !containsSpecial);

    const namecheck = !isValid && !isValid2 && isValidlength && !containsSpace && !containsSpecial;

    setIsValidate({ ...isValidate, username: namecheck });
  };

  const emailisValid = () => {
    const isValid = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(form.email);

    setIsValidate({ ...isValidate, email: isValid });
    uniqueemail({ Email: form.email }).then((res) => {
      console.log(res);
      setIsUnique({ ...isUnique, email: res.success });
    });
  };

  const nicknameisValid = () => {
    const isValid = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z]{2,10}$/.test(form.nickname);

    console.log(isValid);

    setIsValidate({ ...isValidate, nickname: isValid });
    uniquenickname({ Nickname: form.nickname }).then((res) => {
      console.log(res);
      setIsUnique({ ...isUnique, nickname: res.success });
    });

    console.log(isUnique.nickname);
  };

  const passwordisValid = () => {
    const isValid = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/.test(form.password);

    setIsValidate({ ...isValidate, password: isValid });
  };

  const confirmPasswordisValid = () => {
    const isValid = form.password === form.confirmPassword;

    setIsValidate({ ...isValidate, confirmPassword: isValid });
  };

  //유효성 검사
  const nav = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    let body = {
      UserName: form.username,
      Email: form.email,
      Nickname: form.nickname,
      Password: form.password,
    };

    if (Object.values(isValidate).every((v) => v === true) && Object.values(isUnique).every((v) => v === true)) {
      console.log("!!");

      registerUser(body)
        .then((res) => {
          if (res.success) {
            nav("/emailcheck", { state: { email: form.email, name: form.username } });
          } else {
            alert("회원가입 실패");
          }
        })
        .catch((err) => [console.error(err)]);
    } else {
      alert("형식에 맞게 입력해주세요.");
    }
  };

  return (
    <div className="signup-form">
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={form.username} onChange={usernameHandler} onBlur={nameisValid} required />
          {!isValidate.username && <Alert severity="error">자음, 모음, 특수기호 공백 포함 및 영문으로 된 이름은 사용할 수 없으며 실명을 입력해주세요, 2자 이상 10자 이하로 입력해주세요.</Alert>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={(e) => {
              setform({ ...form, email: e.target.value });
            }}
            onBlur={emailisValid}
            required
          />
          {!isValidate.email && <Alert severity="error">이메일 형식에 맞게 입력해주세요.</Alert>}
          {!isUnique && <Alert severity="error">이미 사용중인 이메일입니다.</Alert>}
        </div>
        <div className="form-group">
          <label htmlFor="nickname">nickname:</label>
          <input
            type="text"
            id="text"
            name="text"
            value={form.nickname}
            onChange={(e) => {
              setform({ ...form, nickname: e.target.value });
            }}
            onBlur={nicknameisValid}
            required
          />
          {!isValidate.nickname && <Alert severity="error">닉네임은 2자 이상 10자 이하로 입력해주세요.</Alert>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={(e) => {
              setform({ ...form, password: e.target.value });
            }}
            onBlur={passwordisValid}
            required
          />
          {!isValidate.password && <Alert severity="error">비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상 16자 이하로 입력해주세요.</Alert>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={(e) => {
              setform({ ...form, confirmPassword: e.target.value });
            }}
            onBlur={confirmPasswordisValid}
            required
          />
          {!isValidate.confirmPassword && <Alert severity="error">비밀번호가 일치하지 않습니다.</Alert>}
        </div>
        <div className="form-group">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Resgister1;
