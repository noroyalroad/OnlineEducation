import React, { useState } from "react";
import "../auth/register.scss";
import axios from "axios";
const { registerUser } = require("../../_actions/user_action");

const Resgister1 = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const api = process.env.REACT_APP_SEVER_PORT_AUTH;

  //유효성 검사

  const submitHandler = (e) => {
    e.preventDefault();

    // 유저네임 유효성 검사
    if (username.length < 3) {
      alert("유저네임은 3글자 이상이어야 합니다.");
      return;
    }
    //
    if (password !== confirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    let body = {
      UserName: username,
      Email: email,
      Nickname: nickname,
      Password: password,
    };

    registerUser(body)
      .then((res) => {
        if (res.data.success) {
          alert("회원가입 성공");
        } else {
          alert("회원가입 실패");
        }
      })
      .catch((err) => [console.error(err)]);
  };

  return (
    <div className="signup-form">
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nickname">nickname:</label>
          <input
            type="text"
            id="text"
            name="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Resgister1;
