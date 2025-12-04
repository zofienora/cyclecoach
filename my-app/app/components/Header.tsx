"use client";

export default function Header() {
  return (
    <header className="flex flex-col items-center px-4 pt-4 mx-auto gap-4">
      <div className="flex flex-col items-center">
        <h1 className="text-7xl font-bold font-heading text-secondary text-center py-8">
          CycleCoach
        </h1>
        <h2 className="font-heading text-foreground text-center text-4xl pt-8 pb-2">
          Hello, Sophie 👋
        </h2>
      </div>

      <button className="bg-alert text-white text-sm px-4 py-2 rounded-full font-semibold shadow">
        Log Period
      </button>

      {/* Static cycle position indicator */}
      <div className="mt-10 flex flex-col items-center gap-3">
        {/* Outer ring */}
        <div className="w-40 h-40 rounded-full border-14 border-alert bg-surface" />
        {/* Arrow + label */}
        <div className="flex flex-col items-center text-sm text-foreground">
          <span className="-mb-1">↑</span>
          <span>you are here</span>
        </div>
      </div>
    </header>
  );
}