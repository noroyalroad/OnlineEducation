import React, { useEffect, useRef, useState } from "react";
import vd from "../../assets/기말고사.mp4";
import Progress from "../../components/progress/Progress";
import { watchtime } from "../../_actions/lecture_action";
import { useSelector } from "react-redux";

const Lectureplay = ({ userId, tocId, lectureId }) => {
  const user = useSelector((state) => state.user.userData);

  const [loading, setLoading] = useState(false);
  const videoref = useRef(null);

  const [progress, setProgress] = useState(0);
  const [totaltime, setTotaltime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setLoading(true);
    if (user?.userId && tocId && lectureId) {
      console.log(user.userId, tocId, lectureId);
      let body = {
        userId: user.userId,
        tocId: tocId,
        lectureId: lectureId,
      };
      watchtime(body)
        .then((res) => {
          console.log(res);
          setProgress(res.Progress);
          setCurrentTime(res.currentTime);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [tocId, lectureId]);

  useEffect(() => {
    if (progress !== 100) {
      const video = videoref.current;
      video.src = vd;

      const loadmetadata = () => {
        setTotaltime(video.duration);
        setLoading(false);

        video.currentTime = currentTime;
      };

      const pause = () => {
        setCurrentTime(video.currentTime);
        const calculatedProgress = (video.currentTime / totaltime) * 100;

        // console.log(calculatedProgress);

        let body = {
          userId: user?.userId,
          tocId: tocId,
          lectureId: lectureId,
          progress: Math.floor(calculatedProgress / 5) * 5,
          currentTime: video.currentTime,
        };

        watchtime(body)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const timeupdate = () => {
        const currentTime = video.currentTime;

        const calculatedProgress = (currentTime / totaltime) * 100;
        setProgress(calculatedProgress > 95 ? 100 : Math.floor(calculatedProgress / 5) * 5);
      };

      const ended = () => {
        console.log("end");
        setProgress(100);
      };

      video.addEventListener("loadedmetadata", loadmetadata);
      video.addEventListener("timeupdate", timeupdate);
      video.addEventListener("pause", pause);
      video.addEventListener("ended", ended);

      return () => {
        video.removeEventListener("loadedmetadata", loadmetadata);
        video.removeEventListener("pause", pause);
        video.removeEventListener("timeupdate", timeupdate);
        video.removeEventListener("ended", ended);
      };
    } else {
      console.log("완료");
    }
    //비디오 전체시간
  }, [totaltime]);

  // console.log(totaltime);
  // console.log(progress);

  return (
    <div className="playing">
      <video width="600" ref={videoref} controls muted>
        <source src={vd} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Progress value={progress} />
      <div>강의 자료, 및 강의 대한 설명이 들어감 </div>
    </div>
  );
};

export default Lectureplay;
