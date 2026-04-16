import React, { useMemo, useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const PAGE_SIZE = 50;
function Taskslist() {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (filter == "pending") return tasks.filter((t) => !t.completed);
    if (filter == "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const paginated = useMemo(
    () => filtered.slice(0, page * PAGE_SIZE),
    [filtered, page],
  );
  const hashmore = paginated.length < filtered.length;

  const handleFilter = (f) => {
    setFilter(f);
    setPage(1);
  };
  return (
    <div>
      <div>
        {["all", "pending", "completed"].map((f) => (
          <button key={f} onClick={() => handleFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div>{filter === "all" ? "No Tasks Yet" : `NO ${filter}`}</div>
      ) : (
        <>
          <ul>
            {paginated.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
          {hashmore && (
            <button onClick={() => setPage((p) => p + 1)}>
              Load More ({filtered.length - paginated.length})
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Taskslist;
