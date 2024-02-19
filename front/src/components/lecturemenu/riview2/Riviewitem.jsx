// ReviewItem.js
import React, { useState } from "react";
import { Avatar, Button, Card, CardContent, CardHeader, Typography, TextField } from "@mui/material";

const ReviewItem = ({ userPhoto, reviewText, timestamp, onEdit, onDelete, userName, user }) => {
  const formattedTimestamp = new Date(timestamp).toLocaleString();

  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(reviewText);

  const onEdit1 = () => {
    setEdit(true);
    setEditText(reviewText);
  };

  const offEdit = () => {
    setEdit(false);
    setEditText(reviewText);
  };

  const onEditSubmit = () => {
    onEdit(editText);
    setEdit(false);
  };

  return (
    <Card>
      <CardHeader avatar={<Avatar src={userPhoto} />} title={userName} subheader={formattedTimestamp} />
      <CardContent>
        {/* <Typography variant="body1" color="textPrimary" component="p">
          {reviewText}
        </Typography> */}
        {edit ? (
          <TextField
            label="수정하기"
            variant="outlined"
            fullWidth
            multiline
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value);
            }}
          />
        ) : (
          <Typography variant="body1" color="textPrimary" component="p">
            {reviewText}
          </Typography>
        )}

        <div style={{ marginTop: "10px" }}>
          {user === userName && (
            <>
              {edit ? (
                <>
                  <Button onClick={offEdit} variant="outlined" color="primary" style={{ marginRight: "10px" }}>
                    취소
                  </Button>
                  <Button onClick={onEditSubmit} variant="outlined" color="secondary">
                    저장
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={onEdit1} variant="outlined" color="primary" style={{ marginRight: "10px" }}>
                    수정
                  </Button>
                  <Button onClick={onDelete} variant="outlined" color="secondary">
                    삭제
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewItem;
