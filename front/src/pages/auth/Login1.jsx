import React, { useState } from "react";
import "../auth/Modal.scss";
import kakao from "../../assets/73c891243e7e474e8d81c200967bb14d.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Kakao from "./Kakao";
import Google from "./Google";
const api = process.env.REACT_APP_SEVER_PORT_AUTH;

const { loginUser } = require("../../_actions/user_action");
const Login1 = ({ isOpen, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    let body = {
      Email: email,
      Password: password,
    };

    dispatch(loginUser(body))
      .then((res) => {
        console.log(res);
        if (res.payload.data.success) {
          alert("로그인 성공");
          window.location.reload();
        } else {
          alert("로그인 실패");
        }
      })
      .catch((err) => {
        // console.error(err.response);
        alert(err.response.data.messege);
      });
  };

  const nav = useNavigate();

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
            <h2>Login</h2>
            {/* Add your login form components here */}

            <div className="login-box">
              <form className="email-login" onSubmit={submitHandler}>
                <div className="u-form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="u-form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="u-form-group">
                  <button type="submit">Log in</button>
                </div>
                <div className="u-form-group">
                  <button onClick={() => nav("/register")}>회원가입</button>
                </div>
                <div className="kako">
                  {/* <button>
                    <img src={kakao} alt="kakao" />
                  </button> */}
                  <Kakao />
                  <Google />
                </div>

                <div className="u-form-group">
                  <a href="#" className="forgot-password">
                    Forgot password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login1;
