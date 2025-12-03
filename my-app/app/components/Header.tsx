"use client";

export default function Header() {
  return (
    <header className="flex flex-col items-center px-4 py-16 mx-auto gap-4">
      <div className="flex flex-col items-center ">
        <h1 className="text-7xl font-heading text-secondary text-centerpy-16 py-8">
          CycleCoach
        </h1>
        <h2 className="font-heading text-foreground text-centerpy-8 text-3xl py-8
">
          Hello, Sophie 👋
        </h2>
      </div>

      <button className="bg-alert text-white text-sm px-4 py-2 rounded-full font-semibold shadow">
        Log Period
      </button>
    </header>
  );
}