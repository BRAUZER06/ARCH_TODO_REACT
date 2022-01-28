import React from "react";
import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";

import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

function App() {
  const [completedCheck, setCompletedCheck] = React.useState(true);
  const [edit, setEdit] = React.useState(null);
  const [state, dispatch] = React.useReducer(reducer, [
    {
      id: Math.random().toString(36).substr(2, 9),
      text: "первая задача",
      completed: false,
    },
  ]);

  function reducer(state, action) {
    if (action.type === "ADD_TASK") {
      return [
        ...state,
        {
          id: Math.random().toString(36).substr(2, 9),
          text: action.payload.text,
          completed: action.payload.checked,
        },
      ];
    }
    if (action.type === "REMOVE_ITEMS") {
      let newState = state.filter(
        (item) => item.id !== action.payload.removeNumber
      );

      return newState;
    }
    if (action.type === "CHECKED_COMPLETED") {
      return state.filter((item) => {
        if (action.payload.numbers === item.id) {
          item.completed = !item.completed;
        }
        return item;
      });
    }

    if (action.type === "ALL_CHECKED_ITEMS") {
      return state.map((e) => ({ ...e, completed: action.payload }));
    }
    if (action.type === "CLEAR_STATE_ITEMS_ALL") {
      return [];
    }
    if (action.type === "TAB_CHECKED_ALL_SEEN_ITEMS") {
      return state;
    }

    if (action.type === "TAB_CHECKED_ALL_END_ITEMS") {
      return [...state].filter((e) => e.completed === true);
    }
    if (action.type === "TAB_CHECKED_ALL_OPEN_ITEMS") {
      return [...state].filter((e) => e.completed === false);
    }

    return state;
  }

  const addTask = (text, checked) => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        text,
        checked,
      },
    });
  };

  const remoteItems = (e) => {
    dispatch({
      type: "REMOVE_ITEMS",
      payload: {
        removeNumber: e,
      },
    });
  };
  const checkedCompletedOnClick = (number) => {
   

    dispatch({
      type: "CHECKED_COMPLETED",
      payload: {
        numbers: number,
      },
    });
  };
  const clearStateItemsAll = () => {
    dispatch({
      type: "CLEAR_STATE_ITEMS_ALL",
    });
  };

  const clickAllChecked = () => {
    setCompletedCheck((prev) => !prev);
    dispatch({
      type: "ALL_CHECKED_ITEMS",
      payload: completedCheck,
    });
  };
  // нужно было более понятные имена задвать 
  // и вообще я юрист а не программист :D
  const tabCheckedAll = (e) => {
    if (e === "all") {
      
      dispatch({
        type: "TAB_CHECKED_ALL_SEEN_ITEMS",
      });
    } else if (e === true) {
     
      dispatch({
        type: "TAB_CHECKED_ALL_OPEN_ITEMS",
      });
    } else if (e === false) {
     
      dispatch({
        type: "TAB_CHECKED_ALL_END_ITEMS",
      });
    }
  };

  const editTodo = (e) => {
    setEdit(e);
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onAdd={addTask} />
        <Divider />
        <Tabs value={0}>
          <Tab
            onClick={() => {
              tabCheckedAll("all");
            }}
            label="Все"
          />
          <Tab
            onClick={() => {
              tabCheckedAll(true);
            }}
            label="Активные"
          />
          <Tab
            onClick={() => {
              tabCheckedAll(false);
            }}
            label="Завершённые"
          />
        </Tabs>
        <Divider />
        <List>
          {state.map((obj) => (
            <div key={obj.id}>
              {edit === obj.id ? (
                <div>
                  <input value={obj.text} />
                </div>
              ) : (
                <Item
                  editTodo={editTodo}
                  checkedCompletedOnClick={checkedCompletedOnClick}
                  remoteItems={remoteItems}
                  objId={obj.id}
                  key={obj.id}
                  text={obj.text}
                  completed={obj.completed}
                />
              )}
              {edit === obj.id ? (
                <div>
                  <button onClick={editTodo}>Сохранить</button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button disabled={state.length === 0} onClick={clickAllChecked}>
            Отметить всё
          </Button>
          <Button disabled={state.length === 0} onClick={clearStateItemsAll}>
            Очистить{" "}
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
