// ReviewComponent.js
import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import "../ReviewComponent.scss";

const ReviewComponent = () => {
  const [reviews, setReviews] = useState([{ name: "John", review: "This is a great course!" }]);
  const [reviewText, setReviewText] = useState("");

  const handleReviewSubmit = () => {
    setReviews([...reviews, reviewText]);
    setReviewText("");
  };

  return (
    <div className="review-component">
      <Card className="card" variant="outlined">
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

      <Card className="card" variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            Reviews
          </Typography>
          <List>
            {
              <ListItem>
                <ListItemText primary={reviews[0].name} />
                <ListItemText primary={reviews[0].review} />
              </ListItem>
            }
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewComponent;
