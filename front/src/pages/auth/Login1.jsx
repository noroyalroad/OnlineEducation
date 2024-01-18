import React, { useState } from "react";
import "../auth/Modal.scss";
import kakao from "../../assets/73c891243e7e474e8d81c200967bb14d.jpeg";
import { useNavigate } from "react-router-dom";

const Login1 = ({ isOpen, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
              <form className="email-login">
                <div className="u-form-group">
                  <input type="email" placeholder="Email" />
                </div>
                <div className="u-form-group">
                  <input type="password" placeholder="Password" />
                </div>
                <div className="u-form-group">
                  <button>Log in</button>
                </div>
                <div className="u-form-group">
                  <button onClick={() => nav("/register")}>회원가입</button>
                </div>
                <div className="kako">
                  <button>
                    <img src={kakao} alt="kakao" />
                  </button>
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
