import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Newlecture from "../../components/new/Newlecture";
import Selectlecture from "../../components/category/Select";
import "./main.scss";
const Home = () => {
  // 선택한 강의 정보 출력 함수

  const [selectedCourse, setSelectedCourse] = useState(null);
  const nav = useNavigate();

  // 선택한 강의 정보 출력 함수

  return (
    <div className="home">
      <div className="sel">
        <Selectlecture />
      </div>
    </div>
  );
};

export default Home;
