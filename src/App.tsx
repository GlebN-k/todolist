import React, { useState } from "react";
import "./App.css";
import Todolist from "./Todolist";

export type FilterType = "all" | "active" | "completed"

function App() {

  const [tasks, setTasks] = useState([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
  ]);

  const removeTask = (id: number) => {
    setTasks(tasks.filter((el) => el.id !== id));
  };

  return (
    <div className="App">
      <Todolist
        truck={"what to learn"}
        tasks={tasks}
        removeTask={removeTask}
        // taskFilter={taskFilter}
      />
      <Todolist
        truck={"what to learn"}
        tasks={tasks}
        removeTask={removeTask}
        // taskFilter={taskFilter}
      />
    </div>
  );
}

export default App;
