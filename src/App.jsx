import React from "react";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { useToast } from "./hooks/useToast";
import { StatsBar } from "./components/StatsBar";
import { TaskProvider } from "./context/TaskContext";
import UndoRedoBar from "./components/UndoRedoBar";
import TaskInput from "./components/TaskInput";
import BulkAdd from "./components/BulkAdd";
import Taskslist from "./components/Taskslist";

function AppInner() {
  useKeyboardShortcuts();
  const { toasts } = useToast();
  return (
    <div>
      <header>
        <h1>Smart Task Manager</h1>
        <p>Stay organized, Stay Ahead</p>
      </header>
      <main>
        <StatsBar />
        <UndoRedoBar />
        <TaskInput />
        <BulkAdd />
        <Taskslist />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <AppInner />
    </TaskProvider>
  );
}
