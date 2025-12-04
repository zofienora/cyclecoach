import Header from "./components/Header";
import PhaseTracker from "./components/PhaseTracker";

export default function Home() {
  return (
    <main className="w-[90%] max-w-xl mx-auto px-4">
      <Header />
      <PhaseTracker />
      {/* More components like PhaseTracker will come next */}
    </main>
  );
}