import React from "react";
import { ClipboardList, SearchX, Plus, Sparkles } from "lucide-react";
import { COLUMNS } from "../config/constants";
import { useTasks } from "../hooks/useTasks";
import Column from "../components/Column";
import StatsBar from "../components/StatsBar";
import Toolbar from "../components/Toolbar";
import EmptyState from "../components/EmptyState";

const BoardPage = () => {
  const {
    tasks,
    filteredTasks,
    statusFilter,
    clearFilters,
    openAddModal,
    addSampleTasks,
  } = useTasks();

  // if status filter is applied then show only that one column
  let visibleColumns =
    statusFilter === "all"
      ? COLUMNS
      : COLUMNS.filter((val) => val.id === statusFilter);

  let today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Heading + progress */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-brand">{today}</p>
          <h2 className="mt-1 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Your task board
          </h2>
          <p className="mt-2 max-w-md text-slate-500">
            Drag tasks between columns, or use the menu on each card to move
            them.
          </p>
        </div>

        <StatsBar />
      </div>

      {/* 1. empty state, when there are no tasks at all */}
      {tasks.length === 0 && (
        <EmptyState
          icon={ClipboardList}
          title="Your board is empty"
          text="Add your first task to start planning. Everything is saved in your browser, so it stays after a refresh."
        >
          <button
            onClick={() => openAddModal("todo")}
            className="flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark cursor-pointer"
          >
            <Plus size={18} />
            Add your first task
          </button>
          <button
            onClick={addSampleTasks}
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 cursor-pointer"
          >
            <Sparkles size={18} />
            Load sample tasks
          </button>
        </EmptyState>
      )}

      {tasks.length > 0 && (
        <>
          <Toolbar />

          {/* 2. no results state, when search / filters match nothing */}
          {filteredTasks.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No tasks found"
              text="Nothing matches your search or filters. Try a different title or clear the filters."
            >
              <button
                onClick={clearFilters}
                className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark cursor-pointer"
              >
                Clear search and filters
              </button>
            </EmptyState>
          ) : (
            /* 3. the board */
            <div
              className={`grid grid-cols-1 items-start gap-5 ${
                statusFilter === "all" ? "lg:grid-cols-3" : "max-w-2xl"
              }`}
            >
              {visibleColumns.map((col) => (
                <Column
                  key={col.id}
                  column={col}
                  tasks={filteredTasks.filter((val) => val.status === col.id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BoardPage;
