import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import TaskModal from "../components/TaskModal";
import { useTasks } from "../hooks/useTasks";

const MainLayout = () => {
  const { modal } = useTasks();

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <Outlet />
      </main>

      {/* popup is only mounted when it is open, so the form always starts fresh */}
      {modal.isOpen && <TaskModal />}
    </div>
  );
};

export default MainLayout;
