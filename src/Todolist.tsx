import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import Button from "./components/Button";

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  addTask: (taskName: string) => void;
  removeTask: (taskId: string) => void;
  changeFilter: (value: FilterValuesType) => void;
};

export function Todolist(props: PropsType) {
  const [title, setTitle] = useState("");

  const tsarFilter = (filter: FilterValuesType) => {
    props.changeFilter(filter);
  };

  const addTask = () => {
    props.addTask(title);
    setTitle("");
  };

  const removeTask = (id: string) => {
    props.removeTask(id);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const keyPressedHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const mappedTasks = props.tasks.map((t) => (
    <li key={t.id}>
      <input type="checkbox" checked={t.isDone} />
      <span>{t.title}</span>
      <button onClick={() => removeTask(t.id)}>x</button>
    </li>
  ));

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={changeHandler}
          onKeyDown={keyPressedHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>{mappedTasks}</ul>
      <div>
        <Button name={"All"} callBack={() => tsarFilter("all")} />
        <Button name={"active"} callBack={() => tsarFilter("active")} />
        <Button name={"completed"} callBack={() => tsarFilter("completed")} />
        {/* <button onClick={() => tsarFilter("all")}>All</button>
        <button onClick={() => tsarFilter("active")}>Active</button>
        <button onClick={() => tsarFilter("completed")}>Completed</button> */}
      </div>
    </div>
  );
}
