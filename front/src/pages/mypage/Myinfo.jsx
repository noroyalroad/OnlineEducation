import React, { useEffect, useState } from "react";
import "./mypage.scss";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import ava from "../../assets/pers.jpg";
import { auth } from "../../_actions/user_action";

const Myinfo = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    auth()
      .then((res) => {
        setUserInfo(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log(userInfo);

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
        <Button type="submit" className="change" variant="contained">
          변경
        </Button>
      </div>
      <form className="user-info-edit">
        <h2>사용자 정보 수정</h2>
        <label>
          이름:
          <input
            type="text"
            value={userInfo.name}
            onChange={(e) => handleUserInfoChange("username", e.target.value)}
            className="input-field" // 새로운 클래스 추가
          />
        </label>
        <br />
        <label>
          닉네임
          <input
            type="text"
            value={userInfo.nickname}
            onChange={(e) => handleUserInfoChange("email", e.target.value)}
            className="input-field" // 새로운 클래스 추가
          />
        </label>
        <br />
        <label>
          자기소개
          <input
            type="text"
            value={userInfo.bio}
            onChange={(e) => handleUserInfoChange("age", parseInt(e.target.value, 10))}
            className="input-field" // 새로운 클래스 추가
          />
        </label>
      </form>
    </>
  );
};

export default Myinfo;
