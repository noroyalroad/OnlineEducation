import React from "react";
import "./detaillecture.scss";

import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Lecturemenu from "./lecturemenu/Letcuremenu";

// front/src/components/detaillecture.scss

const DetailLeture = ({ lecture }) => {
  const nav = useNavigate();
  console.log(lecture);
  return (
    <div className="course-detail">
      <div className="header">
        <h2 className="lecturetitle">{lecture.info[0].title}</h2>
        <Button className="apply-button" variant="contained" onClick={() => nav("/payment")}>
          수강신청
        </Button>
      </div>
      <hr></hr>
      <div className="course-image">
        <img
          src="https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202302/061341-973/%EC%B4%88%EA%B2%A9%EC%B0%A8---%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C.png"
          alt="Course Image"
        />
      </div>

      <div className="course-info"></div>

      <Lecturemenu props={lecture} />
    </div>
  );
};

export default DetailLeture;
