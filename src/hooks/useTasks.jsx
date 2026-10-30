import { useContext } from "react";
import { toast } from "react-toastify";
import { Task } from "../context/TaskContext";

export const useTasks = () => {
  const {
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
  } = useContext(Task);

  // one small function to update the state AND save in localStorage
  let saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  //   add task logic
  let addTask = (data) => {
    let newTask = {
      id: Date.now(),
      title: data.title.trim(),
      description: data.description.trim(),
      priority: data.priority,
      dueDate: data.dueDate,
      status: data.status,
    };

    saveTasks([newTask, ...tasks]);
    toast.success("Task added");
  };

  //   edit task logic
  let editTask = (id, data) => {
    let updatedTasks = tasks.map((val) => {
      if (val.id === id) {
        return {
          ...val,
          title: data.title.trim(),
          description: data.description.trim(),
          priority: data.priority,
          dueDate: data.dueDate,
          status: data.status,
        };
      }
      return val;
    });

    saveTasks(updatedTasks);
    toast.success("Task updated");
  };

  //   delete task logic
  let deleteTask = (id) => {
    let remainingTasks = tasks.filter((val) => {
      return val.id !== id;
    });

    saveTasks(remainingTasks);
    toast.warn("Task deleted");
  };

  //   move task to another column
  let moveTask = (id, newStatus) => {
    let updatedTasks = tasks.map((val) => {
      if (val.id === id) {
        return { ...val, status: newStatus };
      }
      return val;
    });

    saveTasks(updatedTasks);
  };

  //   search + filter logic
  let filteredTasks = tasks.filter((val) => {
    let matchSearch = val.title
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());
    let matchPriority = priorityFilter === "all" || val.priority === priorityFilter;
    let matchStatus = statusFilter === "all" || val.status === statusFilter;

    return matchSearch && matchPriority && matchStatus;
  });

  let isFilterActive =
    searchText !== "" || priorityFilter !== "all" || statusFilter !== "all";

  let clearFilters = () => {
    setSearchText("");
    setPriorityFilter("all");
    setStatusFilter("all");
  };

  //   open and close the popup
  let openAddModal = (status = "todo") => {
    setModal({ isOpen: true, task: null, status });
  };

  let openEditModal = (task) => {
    setModal({ isOpen: true, task, status: task.status });
  };

  let closeModal = () => {
    setModal({ isOpen: false, task: null, status: "todo" });
  };

  //   sample tasks for the first time (so the board never looks boring in a demo)
  let addSampleTasks = () => {
    let day = (plus) => {
      let d = new Date();
      d.setDate(d.getDate() + plus);
      return d.toLocaleDateString("en-CA");
    };

    let samples = [
      {
        id: 1,
        title: "Design the landing page",
        description: "Hero section, features and pricing blocks in Figma.",
        priority: "high",
        dueDate: day(2),
        status: "todo",
      },
      {
        id: 2,
        title: "Write unit tests for login",
        description: "Cover the happy path and wrong password cases.",
        priority: "medium",
        dueDate: day(4),
        status: "todo",
      },
      {
        id: 3,
        title: "Build the Kanban board",
        description: "Three columns, search, filters and localStorage.",
        priority: "high",
        dueDate: day(1),
        status: "in-progress",
      },
      {
        id: 4,
        title: "Fix navbar bug on mobile",
        description: "Menu overlaps with the logo on small screens.",
        priority: "low",
        dueDate: day(-1),
        status: "in-progress",
      },
      {
        id: 5,
        title: "Set up GitHub repository",
        description: "Create repo, add README and push the first commit.",
        priority: "medium",
        dueDate: day(-2),
        status: "completed",
      },
    ];

    saveTasks(samples);
    toast.success("Sample tasks added");
  };

  return {
    tasks,
    filteredTasks,
    searchText,
    setSearchText,
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter,
    isFilterActive,
    clearFilters,
    modal,
    openAddModal,
    openEditModal,
    closeModal,
    addTask,
    editTask,
    deleteTask,
    moveTask,
    addSampleTasks,
  };
};
