import React, { useEffect, useState } from "react";
import Lectureplay from "./Lectureplay";
import Lecturetoc from "../../components/toc/Lecturetoc";
import Riviewlecture from "./riview/Riviewlecture";
import "./play.scss";
import Toc from "../../components/lecturemenu/Toc";
import { useLocation } from "react-router-dom";
import ReviewComponent from "./riview/Riviewlecture";
import { useDispatch, useSelector } from "react-redux";
import { checkEnroll } from "../../_actions/lecture_action";

const Mainplaying = () => {
  const location = useLocation();
  const toc = location.state?.toc;
  const title = location.state?.title;

  const { tocid, lectureid } = location?.state;

  console.log(tocid, lectureid);

  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [check, setcheck] = useState("N");

  useEffect(() => {
    dispatch(checkEnroll(lectureid, user?.userId))
      .then((res) => {
        console.log(res);
        setcheck(res.payload.paystatus);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="course-detail">
      <div className="header">
        <h2 className="lecturetitle">{title}</h2>
        <hr />
      </div>

      <div className="content-container">
        <Lectureplay userId={user?.userId} tocId={tocid} lectureId={lectureid} />

        <div className="tc">
          <Toc toc={toc} />
        </div>
      </div>
      <div>
        <hr />
      </div>

      <div className="review">
        <ReviewComponent tocId={tocid} lectureId={lectureid} />
      </div>
    </div>
  );
};

export default Mainplaying;
