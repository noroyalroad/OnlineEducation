import React from "react";
import Lectureplay from "./Lectureplay";
import Lecturetoc from "../../components/toc/Lecturetoc";
import Riviewlecture from "./riview/Riviewlecture";
import "./play.scss";

const Mainplaying = () => {
  return (
    <div className="course-detail">
      <div className="header">
        <h2 className="lecturetitle">한 번에 끝내는 프론트엔드 개발 초격차 패키지 Online.</h2>
        <hr />
      </div>

      <div className="content-container">
        <Lectureplay />

        <Lecturetoc />
      </div>
      <div>
        <hr />
      </div>

      <div className="review">
        <Riviewlecture />
      </div>
    </div>
  );
};

export default Mainplaying;
