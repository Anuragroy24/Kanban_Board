import React, { useState } from "react";
import { CalendarDays, Pencil, Trash2, Check, X } from "lucide-react";
import { COLUMNS, PRIORITIES, formatDate, getToday } from "../config/constants";
import { useTasks } from "../hooks/useTasks";

const TaskCard = ({ task }) => {
  const { openEditModal, deleteTask, moveTask } = useTasks();
  const [isDragging, setIsDragging] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  let priority = PRIORITIES.find((val) => val.id === task.priority);
  let isCompleted = task.status === "completed";
  let isOverdue = !isCompleted && task.dueDate < getToday();

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", String(task.id));
        setIsDragging(true);
      }}
      onDragEnd={() => setIsDragging(false)}
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      {/* Priority + actions */}
      <div className="flex items-center justify-between">
        <span
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${priority.chip}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${priority.dot}`}></span>
          {priority.label}
        </span>

        {/* normal buttons OR delete confirmation */}
        {confirmDelete ? (
          <div className="flex items-center gap-1 text-xs">
            <span className="mr-1 font-medium text-slate-500">Delete?</span>
            <button
              onClick={() => deleteTask(task.id)}
              aria-label="Confirm delete"
              className="rounded-lg bg-rose-50 p-1.5 text-rose-600 hover:bg-rose-100 cursor-pointer"
            >
              <Check size={15} />
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              aria-label="Cancel delete"
              className="rounded-lg bg-slate-100 p-1.5 text-slate-600 hover:bg-slate-200 cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <button
              onClick={() => openEditModal(task)}
              aria-label="Edit task"
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-brand cursor-pointer"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              aria-label="Delete task"
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Title + description */}
      <h3
        className={`mt-3 font-bold leading-snug wrap-break-word ${
          isCompleted ? "text-slate-400 line-through" : ""
        }`}
      >
        {task.title}
      </h3>
      {task.description && (
        <p className="mt-1.5 line-clamp-2 text-sm text-slate-500 wrap-break-word">
          {task.description}
        </p>
      )}

      {/* Due date + move to another column */}
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <span
          className={`flex items-center gap-1.5 text-xs font-semibold ${
            isOverdue ? "text-rose-600" : "text-slate-500"
          }`}
        >
          <CalendarDays size={14} />
          {formatDate(task.dueDate)}
          {isOverdue && " · Overdue"}
        </span>

        <select
          value={task.status}
          onChange={(e) => moveTask(task.id, e.target.value)}
          aria-label="Move task to another column"
          className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600 outline-none cursor-pointer"
        >
          {COLUMNS.map((col) => (
            <option key={col.id} value={col.id}>
              {col.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TaskCard;
