import React from "react";
import { Plus, LayoutGrid } from "lucide-react";
import { useTasks } from "../hooks/useTasks";

const Navbar = () => {
  const { openAddModal } = useTasks();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-lg shadow-brand/30">
            <LayoutGrid size={20} />
          </div>
          <div className="leading-tight">
            <h1 className="text-lg font-extrabold tracking-tight">Boardly</h1>
            <p className="hidden text-xs text-slate-500 sm:block">
              Plan it. Move it. Finish it.
            </p>
          </div>
        </div>

        {/* New task button */}
        <button
          onClick={() => openAddModal("todo")}
          className="flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand cursor-pointer"
        >
          <Plus size={18} />
          New task
        </button>
      </div>
    </header>
  );
};

export default Navbar;
