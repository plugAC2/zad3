import React from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
function App() {
  return (
    <div>
        <TaskForm/>
        <br/>
      <TaskList/>
    </div>
  );
}

export default App;
