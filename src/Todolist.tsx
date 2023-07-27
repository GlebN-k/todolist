import React from "react";

type PropsType = {
  truck: string;
  tasks: Task[];
};

type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

const Todolist = (props: PropsType) => {
  return (
    <div>
      <h3>{props.truck}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map(task => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />{" "}
              <span>{task.title}</span>
            </li>
          );
        })}

        {/* <li>
          <input type="checkbox" checked={true} />{" "}
          <span>{props.tasks[0].title}</span>
        </li>
        <li>
          <input type="checkbox" checked={true} />{" "}
          <span>{props.tasks[1].title}</span>
        </li>
        <li>
          <input type="checkbox" checked={false} />{" "}
          <span>{props.tasks[2].title}</span>
        </li> */}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};

export default Todolist;
