import React, { useState } from "react";
import { FilterType } from "../src/App";

type PropsType = {
  truck: string;
  tasks: Task[];
  removeTask: (id: number) => void;
  //   taskFilter: (filter: string) => void
};

type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

const Todolist = (props: PropsType) => {
  const [filteredArr, setFilteredArr] = useState(props.tasks);

  const taskFilter = (filter: FilterType) => {
    switch (filter) {
      case "active":
        setFilteredArr(props.tasks.filter((el) => !el.isDone));
        break;

      case "completed":
        setFilteredArr(props.tasks.filter((el) => el.isDone));
        break;

      default:
        setFilteredArr(props.tasks);
    }
  };

  return (
    <div>
      <h3>{props.truck}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {filteredArr.map((task, index) => {
          return (
            <li key={task.id}>
              <button
                onClick={() => {
                  props.removeTask(task.id);
                }}
              >
                X
              </button>
              <input type="checkbox" checked={task.isDone} />{" "}
              <span>{task.title}</span>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={() => taskFilter("all")}>All</button>
        <button onClick={() => taskFilter("active")}>Active</button>
        <button onClick={() => taskFilter("completed")}>Completed</button>
      </div>
    </div>
  );
};

export default Todolist;
