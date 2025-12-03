"use client";

export default function Header() {
  return (
    <header className="flex flex-col items-center px-4 pt-4 mx-auto gap-4">
      <div className="flex flex-col items-center">
        <h1 className="text-7xl font-bold font-heading text-secondary text-centerpy-16 py-8">
          CycleCoach
        </h1>
        <h2 className="font-heading text-foreground text-center text-4xl pt-8 pb-2
">
          Hello, Sophie 👋
        </h2>
      </div>

      <button className="bg-alert text-white text-m px-4 py-2 rounded-full font-semibold shadow">
        Log Period
      </button>
    </header>
  );
}