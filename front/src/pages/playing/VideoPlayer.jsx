import React from "react";
import vd from "../../assets/기말고사.mp4";
import { Card, CardContent, Typography, Button } from "@mui/material";
const VideoPlayer = ({ video }) => {
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
