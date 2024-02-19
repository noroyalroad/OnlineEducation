import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import ReviewItem from "./Riviewitem";
import { addquestion, addreview, deleteReview, getReview, updateReview } from "../../../_actions/lecture_action";

const TopReview = ({ lectureId, review, Ques, tocId }) => {
  const user = useSelector((state) => state.user.userData);
  const userimg = user?.profile_image;

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setReviews(review);
  }, [review]);
  const [reviews, setReviews] = useState([
    {
      userPhoto: "user1.jpg",
      reviewText: "이 리뷰는 첫 번째 리뷰입니다.",
      timestamp: Date.now(),
    },
    {
      userPhoto: "user2.jpg",
      reviewText: "두 번째 리뷰는 더욱 긴 리뷰입니다.",
      timestamp: Date.now() - 10000,
    },
  ]);
  const [newReviewText, setNewReviewText] = useState("");

  const handleEdit = (index, edittext, review) => {
    // 수정 로직 구현
    console.log(`수정 버튼이 눌림 - 인덱스: ${index}`);
    console.log(edittext);
    console.log(review.ReviewID);

    // const updateReviews = [...reviews];

    const updatereviews = [...reviews];
    updatereviews[index].Review = edittext;
    updatereviews[index].CreateAt = Date.now();
    setReviews(updatereviews);

    console.log(reviews[index].Review);
    let body = {
      reviewId: review.ReviewID,
      review: edittext,
      userId: user?.userId,
    };

    if (Ques) {
      body = {
        questionId: review.QuesID,
        question: edittext,
        userId: user?.userId,
        tocId: tocId,
      };

      console.log(body);
      const updatereviews = [...reviews];
      updatereviews[index].Ques = edittext;
      updatereviews[index].CreateAt = Date.now();
      setReviews(updatereviews);
    } else {
      updateReview(body)
        .then((res) => {
          res.success ? alert("수정되었습니다.") : alert("수정실패");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (index, review) => {
    // 삭제 로직 구현
    setReviews(reviews.filter((_, i) => i !== index));
    console.log(`삭제 버튼이 눌림 - 인덱스: ${index}`);
    console.log(review.ReviewID);

    let body = {
      reviewId: review.ReviewID,
      userId: user?.userId,
    };

    deleteReview(body)
      .then((res) => {
        res.success ? alert("삭제되었습니다.") : alert("삭제실패");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    if (newReviewText.trim() === "") return;

    if (Ques) {
      const newReview = {
        username: user?.name,
        img_file_path: userimg, // 사용자가 지정한 이미지를 사용하거나, 기본 이미지로 대체 가능
        Ques: newReviewText,
        CreateAt: Date.now(),
      };

      let body = {
        lectureId: lectureId,
        tocId: tocId,
        userId: user?.userId,
        review: newReviewText,
      };
      console.log(body);
      addquestion(body)
        .then((res) => {
          res.success ? alert("질문이 등록 되었습니다.") : alert("작성실패");
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(newReview);
      setReviews([newReview, ...reviews]);
      setNewReviewText("");
    } else {
      const newReview = {
        username: user?.name,
        img_file_path: userimg, // 사용자가 지정한 이미지를 사용하거나, 기본 이미지로 대체 가능
        Review: newReviewText,
        CreateAt: Date.now(),
      };

      let body = {
        lectureId: lectureId,
        userId: user?.userId,
        review: newReviewText,
      };

      console.log(body);

      addreview(body)
        .then((res) => {
          res.success ? alert("리뷰가 등록 되었습니다.") : alert("작성실패");
        })
        .catch((err) => {
          console.log(err);
        });

      setReviews([newReview, ...reviews]);
      setNewReviewText("");
    }
  };

  return (
    <div className="App">
      <h1>{Ques ? "질문하기" : "리뷰 작성"}</h1>
      <div className="review-form">
        <Card>
          <CardHeader
            avatar={<Avatar src="user3.jpg" />} // 사용자가 지정한 이미지를 사용하거나, 기본 이미지로 대체 가능
            title={Ques ? "질문하기" : "리뷰 작성"}
          />
          <CardContent>
            <form onSubmit={handleReviewSubmit}>
              <TextField label={Ques ? "질문 작성" : "리뷰 작성"} variant="outlined" fullWidth multiline value={newReviewText} onChange={(event) => setNewReviewText(event.target.value)} />
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: "10px" }}>
                작성
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      {reviews.map((review, index) => (
        <ReviewItem
          key={index}
          userPhoto={review.img_file_path}
          userName={review.username}
          reviewText={Ques ? review.Ques : review.Review}
          timestamp={review.CreateAt}
          user={user?.name}
          onEdit={(edittext) => handleEdit(index, edittext, review)}
          onDelete={() => handleDelete(index, review)}
        />
      ))}
    </div>
  );
};

export default TopReview;
