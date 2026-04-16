import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

function TaskInput() {
  const [text, setText] = useState("");
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    addTask(trimmed);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a New Task"
        maxLength={200}
      />
      <button type="Submit" disabled={!text.trim()}>
        Add
      </button>
    </form>
  );
}

export default TaskInput;
