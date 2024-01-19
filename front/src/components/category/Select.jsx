import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./catgory.scss";
const Selectlecture = () => {
  const [menu, setmenu] = useState("");

  return (
    <div className="select">
      <Box className="box" sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">강의목록</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select">
            <MenuItem value={1}>최신순</MenuItem>
            <MenuItem value={0}>인기순</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default Selectlecture;
