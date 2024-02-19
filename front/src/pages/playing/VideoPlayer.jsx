import React from "react";
import vd from "../../assets/기말고사.mp4";
import { Card, CardContent, Typography, Button } from "@mui/material";
import Progress from "../../components/progress/Progress";
const VideoPlayer = ({ video }) => {
  // 비디오 전체길이
  // 현재 비디오 시청 중인 시간

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {video.title}
        </Typography>
        <video controls>
          <source src={video.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
