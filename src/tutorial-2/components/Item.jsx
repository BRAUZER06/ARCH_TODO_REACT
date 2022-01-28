import React from "react";
import { IconButton, Checkbox, ListItem, Typography } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const Item = ({
  editTodo,
  text,
  completed,
  remoteItems,
  objId,
  checkedCompletedOnClick,
}) => {
  const removeItem = (e) => {
    remoteItems(e);
  };
  const onClickChecked = (number) => {
    checkedCompletedOnClick(number);
    
  };
  return (
    <ListItem>
      <div className="d-flex item">
        <Checkbox
          onClick={(e) => onClickChecked(objId)}
          checked={completed}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
        />
        <Typography className="item-text">{text}</Typography>
        <div className="item-buttons d-flex">
          <IconButton onClick={()=>{editTodo(objId)}}>
            <EditIcon style={{ fontSize: 20 }} />
          </IconButton>
          <IconButton onClick={() => removeItem(objId)}>
            <DeleteOutlineIcon style={{ fontSize: 20 }} />
          </IconButton>
        </div>
      </div>
    </ListItem>
  );
};
