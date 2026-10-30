import { createRoot } from "react-dom/client";
import "./index.css";

import AppRoutes from "./routes/AppRoutes.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <TaskProvider>
    <AppRoutes />
    <ToastContainer position="bottom-right" autoClose={2000} />
  </TaskProvider>
);
