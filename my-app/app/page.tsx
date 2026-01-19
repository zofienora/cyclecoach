import Header from "./components/Header";
import PhaseTracker from "./components/PhaseTracker";
import Suggestions from "./components/Suggestions";

export default function Home() {
  return (
    <main className="w-[90%] max-w-xl lg:max-w-6xl mx-auto px-4">
      <Header />
      <PhaseTracker />
      <Suggestions />
    </main>
  );
}