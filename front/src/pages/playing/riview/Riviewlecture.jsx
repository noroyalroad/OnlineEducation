// ReviewComponent.js
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import "../ReviewComponent.scss";
import { useDispatch, useSelector } from "react-redux";
import { addquestion, getQuestion } from "../../../_actions/lecture_action";
import Commentlist from "./Commentlist";
import TopReview from "../../../components/lecturemenu/riview2/TopReview";

const ReviewComponent = ({ tocId, lectureId }) => {
  const user = useSelector((state) => state.user.userData);
  let getquestion = useSelector((state) => state.lecture.questionList);
  console.log(getquestion);
  const dispatch = useDispatch();
  const names = user?.name;

  const [reviews, setReviews] = useState([]);
  console.log(reviews);
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");

  // useEffect(() => {
  //   setReviews(getquestion);
  // }, [getquestion]);

  useEffect(() => {
    dispatch(getQuestion(lectureId, tocId))
      .then((res) => {
        console.log(res);
        setReviews(res.payload);
      })
      .catch((err) => {
        console.log(err);
      });
    // getQuestion(lectureId, tocId)
    //   .then((res) => {
    //     dispatch(res);
    //     setReviews(res);
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [lectureId, tocId]);

  // const handleReviewSubmit = (e) => {
  //   const newreviewText = { username: names, Ques: reviewText };
  //   const updatedReviews = [...reviews, newreviewText];

  //   console.log(newreviewText);

  //   let body = {
  //     lectureId: lectureId,
  //     tocId: tocId,
  //     userId: user?.userId,
  //     review: reviewText,
  //   };

  //   console.log(body);
  //   addquestion(body)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   setReviews(updatedReviews);
  //   setReviewText("");
  // };

  return (
    <div className="review-component">
      {/* <Card className="card" variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            Write a Review
          </Typography>
          <TextField className="review-input" label="Enter your review" variant="outlined" multiline value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
          <Button variant="contained" onClick={handleReviewSubmit}>
            Submit Review
          </Button>
        </CardContent>
      </Card>

      <Commentlist reviews={reviews} lectureId={lectureId} tocId={tocId} /> */}
      <TopReview lectureId={lectureId} review={reviews} Ques={true} tocId={tocId} />
    </div>
  );
};

export default ReviewComponent;
