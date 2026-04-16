import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";

export function useKeyboardShortcuts() {
  const { undo, redo, canUndo, canRedo } = useTasks();

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const ctrl = isMac ? e.metaKey : e.ctrlKey;

      const tag = document.activeElement.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (ctrl && e.key === "z" && !e.shiftKey && canUndo) {
        e.preventDefault();
        undo();
      }
      if ((ctrl && e.key === "y") || (ctrl && e.shiftKey && e.key === "z")) {
        if (canRedo) {
          e.preventDefault();
          redo();
        }
      }

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo, canUndo, canRedo]);
}
