import React, { useState } from "react";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";
import { useTasks } from "../hooks/useTasks";

const Column = ({ column, tasks }) => {
  const { moveTask, openAddModal } = useTasks();
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <section
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={(e) => {
        // ignore when the mouse only moves over a child element
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsDragOver(false);
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
        let id = Number(e.dataTransfer.getData("text/plain"));
        moveTask(id, column.id);
        setIsDragOver(false);
      }}
      className={`flex flex-col rounded-3xl border p-3 transition ${
        isDragOver
          ? "border-brand bg-brand-soft"
          : "border-slate-200/80 bg-slate-100/70"
      }`}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-2 py-2">
        <div className="flex items-center gap-2.5">
          <span className={`h-3 w-3 rounded-full ${column.dot}`}></span>
          <h2 className="font-bold">{column.title}</h2>
          <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-slate-500">
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => openAddModal(column.id)}
          aria-label={`Add task to ${column.title}`}
          className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white hover:text-brand cursor-pointer"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Tasks */}
      <div className="mt-2 flex flex-col gap-3">
        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-10 text-center text-sm text-slate-400">
            {column.emptyText}
          </div>
        ) : (
          tasks.map((val) => <TaskCard key={val.id} task={val} />)
        )}
      </div>
    </section>
  );
};

export default Column;
