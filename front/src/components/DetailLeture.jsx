import React, { useEffect, useState } from "react";
import "./detaillecture.scss";

import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Lecturemenu from "./lecturemenu/Letcuremenu";
import { useDispatch, useSelector } from "react-redux";
import { checkEnroll, enroll, getReviewCount } from "../_actions/lecture_action";

// front/src/components/detaillecture.scss

const DetailLeture = ({ lecture }) => {
  const nav = useNavigate();
  const user = useSelector((state) => state.user.userData);
  console.log(lecture.info[0]);
  const [check, setcheck] = useState("N");
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkEnroll(lecture.info[0].LectureID, user?.userId))
      .then((res) => {
        setcheck(res.payload.paystatus);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(getReviewCount(lecture.info[0].LectureID, user?.userId))
      .then((res) => {
        setCount(res.payload[0].count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [lecture.info[0].LectureID, user?.userId]);
  return (
    <div className="course-detail">
      <div className="header">
        <h2 className="lecturetitle">{lecture.info[0].title}</h2>
        {check === "N" ? (
          <Button
            className="apply-button"
            variant="contained"
            onClick={() => {
              if (user?.isAuth) {
                let body = {
                  LectureID: lecture.info[0].LectureID,
                  UserID: user?.userId,
                };
                console.log(body);
                enroll(body)
                  .then((res) => {
                    console.log(res);
                    if (res.success) {
                      nav("/payments", { state: { lectureinfo: lecture.info[0] } });
                    } else {
                      alert("이미 수강신청한 강의입니다.");
                    }
                  })
                  .catch((err) => {});
              } else {
                alert("로그인이 필요합니다.");
              }
            }}
          >
            수강신청
          </Button>
        ) : (
          <Button
            className="apply-button"
            variant="contained"
            onClick={() => {
              nav("/playlecture", { state: { toc: lecture?.toc, title: lecture?.info[0].title, tocid: lecture?.toc[0]?.TOCID, lectureid: lecture.info[0].LectureID } });
            }}
          >
            이어보기
          </Button>
        )}
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
