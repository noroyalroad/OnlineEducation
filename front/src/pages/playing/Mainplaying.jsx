import React from "react";
import Lectureplay from "./Lectureplay";
import Lecturetoc from "../../components/toc/Lecturetoc";
import Riviewlecture from "./riview/Riviewlecture";
import "./play.scss";
import Toc from "../../components/lecturemenu/Toc";
import { useLocation } from "react-router-dom";
import ReviewComponent from "./riview/Riviewlecture";

const Mainplaying = () => {
  const location = useLocation();
  const toc = location.state?.toc;
  const title = location.state?.title;

  return (
    <div className="course-detail">
      <div className="header">
        <h2 className="lecturetitle">{title}</h2>
        <hr />
      </div>

      <div className="content-container">
        <Lectureplay />

        <div className="tc">
          <Toc toc={toc} />
        </div>
      </div>
      <div>
        <hr />
      </div>

      <div className="review">
        <ReviewComponent />
      </div>
    </div>
  );
};

export default Mainplaying;
