import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectBox = ({ menu, setmenu }) => {
  return (
    <>
      <Box className="box" sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">강의목록</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => {
              setmenu(e.target.value);
            }}
          >
            <MenuItem value={1}>최신순</MenuItem>
            <MenuItem value={0}>인기순</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default SelectBox;
