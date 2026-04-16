import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { initialState, taskReducer } from "../reducer/taskReducer";
import { fakeApi } from "../utils/fakeApi";

const TaskContext = createContext(null);
let nextId = 1;

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = useCallback(async (text) => {
    const id = nextId++;
    dispatch({ type: "ADD_TASK", id, text });

    try {
      await fakeApi.sync("ADD_TASK", { id, text });
      dispatch({ type: "SYNC_SUCCES", id });
    } catch {
      console.warn("syncfailed for ADD TASK", id);
      dispatch({ type: "SYNC SUCCESS", id });
    }
  }, []);
  const deleteTask = useCallback(async (id) => {
    dispatch({ type: "DELETE_TASK", id });
    try {
      await fakeApi.sync("DELETE_TASK", { id });
    } catch {
      console.warn("Sync failed for DELETE_TASK", id);
    }
  }, []);
  const ToggleTask = useCallback(async (id) => {
    dispatch({ type: "TOGGLE_TASK", id });
    try {
      await fakeApi.sync("TOGGLE_TASK", { id });
      dispatch({ type: "SYNC_SUCCESS", id });
    } catch (error) {
      console.warn("Sync failed for TOGGLE_TASK", id);
      dispatch({ type: "SYNC_SUCCESS", id });
    }
  }, []);
  const editTask = useCallback(async (id, text) => {
    dispatch({ type: "EDIT_TASK", id, text });
    try {
      await fakeApi.sync("EDIT_TASK", { id, text });
      dispatch({ type: "SYNC_SUCCESS", id });
    } catch (error) {
      console.warn("SYnc Failed for EDIT_TASK", id);
      dispatch({ type: "SYNC_SUCCESS", id });
    }
  }, []);

  const undo = useCallback(() => dispatch({ type: "UNDO" }), []);
  const redo = useCallback(() => dispatch({ type: "REDO" }), []);

  const stats = useMemo(() => {
    const total = state.tasks.length;
    const completed = state.tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [state.tasks]);

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        stats,
        canUndo,
        canRedo,
        addTask,
        deleteTask,
        ToggleTask,
        editTask,
        undo,
        redo,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
