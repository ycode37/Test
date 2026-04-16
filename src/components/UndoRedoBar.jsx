import React from "react";
import { useTasks } from "../context/TaskContext";

function UndoRedoBar() {
  const { undo, redo, canUndo, canRedo } = useTasks();
  return (
    <div>
      <button
        onClick={undo}
        disabled={!canUndo}
        title="Undo Last Action (Ctrl + Z) "
      >
        Undo
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
        title="Redo Last Action (Ctrl + Y) "
      >
        Redo
      </button>
    </div>
  );
}

export default UndoRedoBar;
