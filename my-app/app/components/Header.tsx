"use client";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-6">
      <div>
        <h1 className="text-lg font-heading text-foreground">
          Hello, Sophie 👋
        </h1>
      </div>

      <button className="bg-alert text-white text-sm px-4 py-2 rounded-full font-semibold shadow">
        Log Period
      </button>
    </header>
  );
}