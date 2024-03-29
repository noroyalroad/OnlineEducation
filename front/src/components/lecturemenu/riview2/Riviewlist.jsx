// ReviewList.js
import React from "react";
import ReviewItem from "./Riviewitem";

const ReviewList = ({ reviews, onEdit, onDelete }) => {
  return (
    <div className="review-list">
      {reviews?.map((review) => (
        <ReviewItem key={review.id} review={review} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ReviewList;
