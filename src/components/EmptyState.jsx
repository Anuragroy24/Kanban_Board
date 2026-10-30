import React from "react";

// one reusable box for "no tasks yet" and "no results" screens
const EmptyState = ({ icon: Icon, title, text, children }) => {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft text-brand">
        <Icon size={30} />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500">{text}</p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>
    </div>
  );
};

export default EmptyState;
