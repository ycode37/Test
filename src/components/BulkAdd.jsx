import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

const Sample_Tasks = [
  "Review pull Request",
  "write unit tests",
  "Update documentation",
  "fix bug in login flow",
  "Refactor Auth Module",
  "Deploy to staging",
  "Review pull Request",
  "write unit tests",
  "Update documentation",
  "fix bug in login flow",
  "Refactor Auth Module",
  "Deploy to staging",
];

export default function BulkAdd() {
  const { addTask } = useTasks();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(100);

  const handleBulkAdd = async () => {
    setLoading(true);
    const batchSize = 50;
    let added = 0;

    const addBatch = () => {
      const end = Math.min(added + batchSize, count);
      for (let i = added; i < end; i++) {
        const base = Sample_Tasks[i % Sample_Tasks.length];
        addTask(`${base} #${i + 1}`);
      }
      added = end;
      if (added < count) {
        setTimeout(addBatch, 0);
      } else {
        setLoading(false);
      }
    };
    addBatch();
  };
  return (
    <div>
      <div>stress test</div>
      <input
        type="number"
        value={count}
        min={1}
        max={5000}
        onChange={(e) => setCount(Number(e.target.value))}
      />
      <button onClick={handleBulkAdd} disabled={loading}>
        {loading ? "Adding" : `+Add ${count} tasks`}
      </button>
    </div>
  );
}
