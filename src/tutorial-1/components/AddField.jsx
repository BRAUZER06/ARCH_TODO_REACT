import { TextField, Button, Checkbox } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const AddField = ({ onClickAdd, onChange, value, onChangeBox, onBox}) => {
  return (
    <div className="field">
      <Checkbox
      onChange={onChangeBox}
      checked={onBox}
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
      />
      <TextField
       onChange={onChange}
        placeholder="Введите текст задачи..."
        variant="standard"
        fullWidth
        value={value}
       
      />
      <Button onClick={onClickAdd}>
        <AddIcon />
      </Button>
    </div>
  );
};