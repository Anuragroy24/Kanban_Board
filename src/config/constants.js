// all the fixed data of our app lives here, so we can reuse it in every component

// the three columns of the board
export const COLUMNS = [
  {
    id: "todo",
    title: "Todo",
    dot: "bg-slate-400",
    emptyText: "Nothing planned yet",
  },
  {
    id: "in-progress",
    title: "In Progress",
    dot: "bg-amber-400",
    emptyText: "Drag a task here when you start it",
  },
  {
    id: "completed",
    title: "Completed",
    dot: "bg-emerald-500",
    emptyText: "Finished tasks will show up here",
  },
];

// priority options with their colors
export const PRIORITIES = [
  {
    id: "high",
    label: "High",
    dot: "bg-rose-500",
    chip: "bg-rose-50 text-rose-700",
    active:
      "peer-checked:bg-rose-50 peer-checked:text-rose-700 peer-checked:border-rose-300",
  },
  {
    id: "medium",
    label: "Medium",
    dot: "bg-amber-500",
    chip: "bg-amber-50 text-amber-700",
    active:
      "peer-checked:bg-amber-50 peer-checked:text-amber-700 peer-checked:border-amber-300",
  },
  {
    id: "low",
    label: "Low",
    dot: "bg-sky-500",
    chip: "bg-sky-50 text-sky-700",
    active:
      "peer-checked:bg-sky-50 peer-checked:text-sky-700 peer-checked:border-sky-300",
  },
];

// today's date as YYYY-MM-DD (same format as <input type="date" />)
export const getToday = () => {
  return new Date().toLocaleDateString("en-CA");
};

// "2026-11-02" -> "2 Nov"
export const formatDate = (date) => {
  return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};
