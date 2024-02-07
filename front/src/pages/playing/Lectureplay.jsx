import React from "react";
import vd from "../../assets/기말고사.mp4";
const Lectureplay = () => {
  return (
    <div className="playing">
      <video width="600" controls muted autoPlay>
        <source src={vd} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div>강의 자료, 및 강의 대한 설명이 들어감 </div>
    </div>
  );
};

export default Lectureplay;
