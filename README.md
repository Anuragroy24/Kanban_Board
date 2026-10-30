# Boardly - Kanban Task Board

A responsive Kanban board built with **React + Vite + Tailwind CSS**.
Manage tasks across **Todo**, **In Progress** and **Completed**. Everything is saved in `localStorage`.

## Features (as per Sheet 02, Section 4)

- Add task: title, description, priority and due date
- Edit / Delete a task (delete asks for a quick confirmation on the card)
- Move tasks between the 3 columns (drag and drop, or the dropdown on each card - works on mobile too)
- Search tasks by title
- Filter by priority and status
- LocalStorage persistence, tasks stay after a refresh
- Responsive UI: 3 columns on desktop, stacked on mobile (the popup becomes a bottom sheet)
- UX states: empty state, no-results state, form validation

## Run it

```bash
npm install
npm run dev
```

## Folder structure (same pattern as the reference project)

```
src/
  components/   Navbar, Toolbar, StatsBar, Column, TaskCard, TaskModal, EmptyState
  config/       constants.js  (columns, priorities, date helpers)
  context/      TaskContext.jsx  (tasks, search, filters, popup state)
  hooks/        useTasks.jsx  (add / edit / delete / move / filter logic)
  layouts/      MainLayout.jsx
  pages/        BoardPage.jsx
  routes/       AppRoutes.jsx
```

## How the data is stored

```js
// get (when app starts) - TaskContext.jsx
const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);

// set (every time tasks change) - useTasks.jsx
localStorage.setItem("tasks", JSON.stringify(newTasks));
```

A task looks like:

```js
{ id: 1730000000000, title: "...", description: "...", priority: "high", dueDate: "2026-11-02", status: "todo" }
```

## Deploy

Push to GitHub, then import the repo in Vercel or Netlify. Build command: `npm run build`, output folder: `dist`.
