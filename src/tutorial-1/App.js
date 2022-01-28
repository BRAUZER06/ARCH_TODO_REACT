import React from "react";
import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

function App() {
  const [valueInput, setValueInput] = React.useState("");
  const [box, setBox] = React.useState(false);
  const [completedCheck, setCompletedCheck] = React.useState(true);
  const [state, dispatch] = React.useReducer(reducer, [
    {
      id: 1,
      text: "первая задача",
      completed: false,
    },
    {
      id: 2,
      text: "проверил как работает отрисовка",
      completed: true,
    },
  ]);

  function reducer(state, action) {
    if (action.type === "ADD_TASK") {
      return [
        ...state,
        {
          id: state.length ? state[state.length - 1].id + 1 : 0,
          text: valueInput,
          completed: box,
        },
      ];
    }
    if (action.type === "CLEAR_STATE") {
      return [];
    }
    if (action.type === "MARK_COMPLETED") {
      return state.map((e) => ({
        ...e,
        completed: action.payload,
      }));
    }

    return state;
  }

  const addTask = () => {
    dispatch({
      type: "ADD_TASK",
    });
  };

  const onChangeInput = (e) => {
    setValueInput(e.target.value);
  };

  const onChangeBox = (e) => {
    setBox(e.target.checked);
  };

  const clearState = () => {
    dispatch({
      type: "CLEAR_STATE",
    });
  };
  const markCompleted = () => {
    setCompletedCheck((prev) => !prev);
    dispatch({
      type: "MARK_COMPLETED",
      payload: completedCheck,
    });
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField
          onClickAdd={addTask}
          onChange={onChangeInput}
          onChangeBox={onChangeBox}
          onBox={box}
          value={valueInput}
        />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map((obj) => (
            <Item key={obj.id} text={obj.text} completed={obj.completed} />
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={markCompleted}>Отметить всё</Button>
          <Button onClick={clearState}>Очистить </Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
