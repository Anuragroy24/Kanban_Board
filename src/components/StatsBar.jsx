import React from "react";
import { COLUMNS } from "../config/constants";
import { useTasks } from "../hooks/useTasks";

const StatsBar = () => {
  const { tasks } = useTasks();

  // count the tasks of every column
  let counts = COLUMNS.map((col) => {
    return {
      ...col,
      count: tasks.filter((val) => val.status === col.id).length,
    };
  });

  let total = tasks.length;
  let completed = counts.find((val) => val.id === "completed").count;
  let percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="w-full rounded-3xl bg-ink p-5 text-white shadow-xl shadow-ink/20 lg:w-105">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-slate-400">Overall progress</p>
          <p className="mt-1 text-4xl font-extrabold tracking-tight">
            {percent}%
          </p>
        </div>
        <p className="text-sm text-slate-400">
          {completed} of {total} done
        </p>
      </div>

      {/* bar divided in 3 colors (todo, in progress, completed) */}
      <div className="mt-4 flex h-2.5 w-full overflow-hidden rounded-full bg-white/10">
        {counts.map((col) => (
          <div
            key={col.id}
            className={`${col.dot} transition-all duration-500`}
            style={{ width: `${total === 0 ? 0 : (col.count / total) * 100}%` }}
          ></div>
        ))}
      </div>

      {/* legend */}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {counts.map((col) => (
          <div key={col.id} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${col.dot}`}></span>
            <span className="text-slate-300">{col.title}</span>
            <span className="font-bold">{col.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
