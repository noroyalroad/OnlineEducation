import React, { useEffect, useState } from "react";
import { getQuestion } from "../../../_actions/lecture_action";
import { Card, CardContent, Typography, TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import { useDispatch } from "react-redux";

const Commentlist = ({ reviews, lectureId, tocId }) => {
  console.log(reviews, lectureId, tocId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestion(lectureId, tocId))
      .then((res) => {
        console.log(res);
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

  return (
    <Card className="card" variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Reviews
        </Typography>
        <List>
          {reviews?.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.username} />
              <ListItemText primary={item.Ques} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Commentlist;
