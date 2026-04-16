import React, { memo, useState } from "react";
import { useTasks } from "../context/TaskContext";

const TaskItem = memo(function TaskItem({ task }) {
  const { ToggleTask, deleteTask, editTask } = useTasks();
  const [isEditing, setisEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEditSubmit = (e) => {
    e.preventdefault();
    const trimmed = editText.trim();
    if (!trimmed || trimmed === taks.text) {
      setisEditing(false);
      setEditText(task.text);
      return;
    }
    editTask(task.id, trimmed);
    setisEditing(false);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Escape") {
      setisEditing(false);
      setEditText(task.text);
    }
  };

  return (
    <div>
      <li>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => ToggleTask(task.id)}
        />
        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleEditKeyDown}
            />
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => {
                setisEditing(false);
                setEditText(task.text);
              }}
            ></button>
          </form>
        ) : (
          <>
            <span>{task.text}</span>
            <div>
              {task.syncing}
              <button
                onClick={() => setisEditing(true)}
                disabled={task.completed}
              >
                Edit
              </button>
              <button onClick={() => deleteTask(task.id)}> X</button>
            </div>
          </>
        )}
      </li>
    </div>
  );
});
export default TaskItem;
