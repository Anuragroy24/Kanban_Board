import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { COLUMNS, PRIORITIES } from "../config/constants";
import { useTasks } from "../hooks/useTasks";

const inputStyle =
  "w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

const TaskModal = () => {
  const { modal, closeModal, addTask, editTask } = useTasks();

  // if modal.task has a task then we are editing, otherwise we are adding
  let isEditing = modal.task !== null;

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isEditing
      ? {
          title: modal.task.title,
          description: modal.task.description,
          priority: modal.task.priority,
          dueDate: modal.task.dueDate,
          status: modal.task.status,
        }
      : {
          title: "",
          description: "",
          priority: "medium",
          dueDate: "",
          status: modal.status,
        },
  });

  //   close the popup when Escape key is pressed
  useEffect(() => {
    let handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  let formSubmit = (data) => {
    if (isEditing) {
      editTask(modal.task.id, data);
    } else {
      addTask(data);
    }
    closeModal();
  };

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-40 flex items-end justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-pop max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl motion-reduce:animate-none sm:max-w-lg sm:rounded-3xl sm:p-8"
      >
        {/* Heading */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              {isEditing ? "Edit task" : "Add a new task"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {isEditing
                ? "Update the details and save your changes."
                : "Add the details, you can always change them later."}
            </p>
          </div>
          <button
            onClick={closeModal}
            aria-label="Close"
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Title
            </label>
            <input
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title needs at least 3 characters",
                },
                maxLength: {
                  value: 60,
                  message: "Title can be 60 characters at most",
                },
                validate: (value) =>
                  value.trim() !== "" || "Title can't be only spaces",
              })}
              type="text"
              placeholder="e.g. Prepare weekly report"
              className={inputStyle}
            />
            {errors.title && (
              <p className="mt-1.5 text-sm text-rose-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
              <span className="ml-1 font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              {...register("description", {
                maxLength: {
                  value: 200,
                  message: "Description can be 200 characters at most",
                },
              })}
              rows={3}
              placeholder="Add a few details about this task"
              className={`${inputStyle} resize-none`}
            />
            {errors.description && (
              <p className="mt-1.5 text-sm text-rose-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Priority */}
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">Priority</p>
            <div className="grid grid-cols-3 gap-2">
              {PRIORITIES.map((val) => (
                <label key={val.id} className="cursor-pointer">
                  <input
                    {...register("priority")}
                    type="radio"
                    value={val.id}
                    className="peer sr-only"
                  />
                  <span
                    className={`flex items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-sm font-semibold text-slate-500 transition peer-focus-visible:outline-2 peer-focus-visible:outline-brand ${val.active}`}
                  >
                    <span className={`h-2 w-2 rounded-full ${val.dot}`}></span>
                    {val.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">Status</p>
            <div className="grid grid-cols-3 gap-2">
              {COLUMNS.map((val) => (
                <label key={val.id} className="cursor-pointer">
                  <input
                    {...register("status")}
                    type="radio"
                    value={val.id}
                    className="peer sr-only"
                  />
                  <span className="flex items-center justify-center rounded-xl border border-slate-300 px-1 py-2.5 text-center text-sm font-semibold text-slate-500 transition peer-checked:border-brand peer-checked:bg-brand-soft peer-checked:text-brand peer-focus-visible:outline-2 peer-focus-visible:outline-brand">
                    {val.title}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Due date */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Due date
            </label>
            <input
              {...register("dueDate", { required: "Due date is required" })}
              type="date"
              className={inputStyle}
            />
            {errors.dueDate && (
              <p className="mt-1.5 text-sm text-rose-600">
                {errors.dueDate.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 rounded-xl border border-slate-300 py-3 font-semibold text-slate-600 transition hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-brand py-3 font-semibold text-white transition hover:bg-brand-dark cursor-pointer"
            >
              {isEditing ? "Save changes" : "Add task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
