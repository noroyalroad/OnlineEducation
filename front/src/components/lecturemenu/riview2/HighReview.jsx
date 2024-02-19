import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getReview } from "../../../_actions/lecture_action";
import TopReview from "./TopReview";

const HighReview = ({ lectureId }) => {
  const user = useSelector((state) => state.user.userData);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReview(lectureId)
      .then((res) => {
        console.log(res);
        setReviews(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [lectureId]);

  return (
    <div>
      <TopReview lectureId={lectureId} review={reviews} />
    </div>
  );
};

export default HighReview;
