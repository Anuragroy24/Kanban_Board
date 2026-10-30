import React from "react";
import { Search, X, FilterX } from "lucide-react";
import { COLUMNS } from "../config/constants";
import { useTasks } from "../hooks/useTasks";

const selectStyle =
  "rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 cursor-pointer";

const Toolbar = () => {
  const {
    searchText,
    setSearchText,
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter,
    isFilterActive,
    clearFilters,
  } = useTasks();

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      {/* Search by title */}
      <div className="relative flex-1">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search tasks by title"
          aria-label="Search tasks by title"
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        {searchText && (
          <button
            onClick={() => setSearchText("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-3 md:flex">
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          aria-label="Filter by priority"
          className={selectStyle}
        >
          <option value="all">All priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by status"
          className={selectStyle}
        >
          <option value="all">All statuses</option>
          {COLUMNS.map((col) => (
            <option key={col.id} value={col.id}>
              {col.title}
            </option>
          ))}
        </select>
      </div>

      {/* Clear button only when some filter is applied */}
      {isFilterActive && (
        <button
          onClick={clearFilters}
          className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-brand transition hover:bg-brand-soft cursor-pointer"
        >
          <FilterX size={16} />
          Clear
        </button>
      )}
    </div>
  );
};

export default Toolbar;
