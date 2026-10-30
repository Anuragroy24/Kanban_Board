import { createContext, useState } from "react";

export const Task = createContext();

export const TaskProvider = ({ children }) => {
  // get the saved tasks from localStorage, if nothing is saved then start with empty array
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  // search + filters
  const [searchText, setSearchText] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // add/edit popup (isOpen -> show or hide, task -> the task we are editing, status -> default column)
  const [modal, setModal] = useState({
    isOpen: false,
    task: null,
    status: "todo",
  });

  return (
    <Task.Provider
      value={{
        tasks,
        setTasks,
        searchText,
        setSearchText,
        priorityFilter,
        setPriorityFilter,
        statusFilter,
        setStatusFilter,
        modal,
        setModal,
      }}
    >
      {children}
    </Task.Provider>
  );
};
