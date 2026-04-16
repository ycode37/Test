export const initialState = {
  tasks: [],
  past: [],
  future: [],
};

function pushHistory(state) {
  return {
    past: [...state.past, state.tasks],
    future: [],
  };
}

export function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK": {
      const newTasks = [
        { id: action.id, text: action.text, completed: false, syncing: true },
      ];
      return { ...state, ...pushHistory(state), tasks: newTasks };
    }

    case "DELETED_TASK": {
      const newTasks = state.tasks.filter((t) => t.id !== action.id);
      return { ...state, ...pushHistory(state), tasks: newTasks };
    }
    case "TOGGLE_TASK": {
      const newTasks = state.tasks.map((t) =>
        t.id === action.id
          ? { ...t, completed: !t.completed, syncing: true }
          : t,
      );
      return { ...state, ...pushHistory(state), tasks: newTasks };
    }
    case "EDIT_TASKS": {
      const newTasks = state.tasks.map((t) =>
        t.id === action.id ? { ...t, text: action.text, syncing: true } : t,
      );
      return { ...state, ...pushHistory(state), tasks: newTasks };
    }

    case "SYNC_SUCCESS": {
      const newTasks = state.tasks.map((t) =>
        t.id === action.id ? { ...t, syncing: false } : t,
      );
      return { ...state, tasks: newTasks };
    }

    case "UNDO": {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      return {
        tasks: previous,
        past: state.past.slice(0, -1),
        future: [state.tasks, ...state.future],
      };
    }

    case "REDO": {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      return {
        tasks: next,
        past: [...state.past, state.tasks],
        future: state.future.slice(1),
      };
    }

    default:
      return state;
  }
}
