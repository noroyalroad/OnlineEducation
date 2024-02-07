// MyPage.js

import React, { useState } from "react";
import "./mypage.scss"; // SCSS 파일을 import

import Myinfo from "./Myinfo";
import Mylecture from "./Mylecture";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const MyPage = () => {
  const { vvv } = useParams();

  const user = useSelector((state) => state.user.userData);

  return (
    <div className="my-page-container">
      <h3>
        {vvv}
        <hr />
      </h3>
      {vvv === "내정보" ? <Myinfo info={user} /> : <Mylecture />}
    </div>
  );
};

export default MyPage;
