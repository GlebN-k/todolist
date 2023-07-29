import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import s from "../src/Todolist.module.css";
import { CheckBox } from "./components/CheckBox";

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeCheckBoxStatus: (taskId: string, status: boolean) => void;
};

export function Todolist(props: PropsType) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [buttonName, setButtonName] = useState('all')

  const addTask = () => {
    if (title.trim()) {
      props.addTask(title.trim());
      setTitle("");
    } else {
      setError("Title is required!");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      addTask();
    }
  };

  // const onAllClickHandler = () => props.changeFilter("all");
  // const onActiveClickHandler = () => props.changeFilter("active");
  // const onCompletedClickHandler = () => props.changeFilter("completed");

  const tsarFoo = (name: FilterValuesType) => {
    props.changeFilter(name);
    setButtonName(name)
  }

  const changeCheckBoxHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
    props.changeCheckBoxStatus(taskId, e.currentTarget.checked);
    // console.log(e.currentTarget.checked)
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          className={error ? s.error : ""}
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      {error && <div className={s.errorMessage}>{error}</div>}
      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(t.id);
          // const changeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
          //   props.changeCheckBoxStatus(t.id, e.currentTarget.checked);
          //   // console.log(e.currentTarget.checked)
          // };

          return (
            <li key={t.id} className={t.isDone ? s.isDone : ''}>
              <CheckBox changeCheckBoxHandler={changeCheckBoxHandler} checked={t.isDone} id={t.id}/>
              {/* <input
                type="checkbox"
                onChange={changeCheckBoxHandler}
                checked={t.isDone}
                
              /> */}
              <span>{t.title}</span>
              <button onClick={onClickHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button className={buttonName === 'all' ? s.activeFilter : ''} onClick={() => tsarFoo('all')}>All</button>
        <button className={buttonName === 'active' ? s.activeFilter : ''} onClick={() => tsarFoo('active')}>Active</button>
        <button className={buttonName === 'completed' ? s.activeFilter : ''} onClick={() => tsarFoo('completed')}>Completed</button>
      </div>
    </div>
  );
}
