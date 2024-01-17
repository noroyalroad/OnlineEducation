import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "./../../playing/play.scss";

const Writecomment = () => {
  return (
    <Box
      className="writecomment"
      sx={{
        width: 500,
        maxWidth: "100%",
      }}
    >
      <TextField fullWidth label="fullWidth" id="fullWidth" />

      <Button variant="contained">등록</Button>
    </Box>
  );
};

export default Writecomment;
