"use client";

export default function Header() {
  return (
    <header className="flex flex-col items-center px-4 py-6 mx-auto gap-4 border-2">
      <div className="flex flex-col items-center border">
        <h1 className="text-[48px] font-heading text-secondary text-center border-2">
          CycleCoach
        </h1>
        <h2 className="text-lg font-heading text-foreground text-center border-4 py-8">
          Hello, Sophie 👋
        </h2>
      </div>

      <button className="bg-alert text-white text-sm px-4 py-2 rounded-full font-semibold shadow border-2">
        Log Period
      </button>
    </header>
  );
}