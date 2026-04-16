import React from "react";
import { useTasks } from "../context/TaskContext";

export const StatsBar = () => {
  const { stats } = useTasks();
  return (
    <div>
      <div>
        <span>{stats.total}</span>
        <span>total</span>
      </div>
      <div>
        <span>{stats.pending}</span>
        <span>Pending</span>
      </div>
      <div>
        <span>{stats.completed}</span>
        <span>completed</span>
      </div>
    </div>
  );
};
