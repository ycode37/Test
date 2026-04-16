import React from "react";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { useToast } from "./hooks/useToast";
import { StatsBar } from "./components/StatsBar";

const App = () => {
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
        </main>
      </div>
    );
  }
};

export default App;
