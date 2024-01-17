import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Lecturetoc = () => {
  return (
    <div className="tttoc">
      <h3>강의목차</h3>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {[1, 2, 3].map((value) => (
          <ListItem
            className="listitem"
            key={value}
            disableGutters
            secondaryAction={
              <IconButton className="playbt" aria-label="comment" sx={{ marginLeft: "100px" }}>
                <PlayArrowIcon />
              </IconButton>
            }
          >
            <ListItemText primary={`Line item ${value}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Lecturetoc;
