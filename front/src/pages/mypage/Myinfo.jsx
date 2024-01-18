import React, { useState } from "react";
import "./mypage.scss";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import ava from "../../assets/pers.jpg";

const Myinfo = () => {
  const [userInfo, setUserInfo] = useState({
    username: "JohnDoe",
    email: "john.doe@example.com",
    age: 25,
  });

  const handleUserInfoChange = (field, value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [field]: value,
    }));
  };
  return (
    <>
      <div className="user-info">
        <Avatar alt="Remy Sharp" src={ava} sx={{ width: 100, height: 100 }} />
        <Button className="change" variant="contained">
          변경
        </Button>
      </div>
      <div className="user-info-edit">
        <h2>사용자 정보 수정</h2>
        <label>
          이름:
          <input
            type="text"
            value={userInfo.username}
            onChange={(e) => handleUserInfoChange("username", e.target.value)}
            className="input-field" // 새로운 클래스 추가
          />
        </label>
        <br />
        <label>
          닉네임
          <input
            type="email"
            value={userInfo.email}
            onChange={(e) => handleUserInfoChange("email", e.target.value)}
            className="input-field" // 새로운 클래스 추가
          />
        </label>
        <br />
        <label>
          자기소개
          <input
            type="text"
            value={userInfo.age}
            onChange={(e) => handleUserInfoChange("age", parseInt(e.target.value, 10))}
            className="input-field" // 새로운 클래스 추가
          />
        </label>
      </div>
    </>
  );
};

export default Myinfo;
