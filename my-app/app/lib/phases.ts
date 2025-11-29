
export type PhaseName = "menstrual" | "follicular" | "ovulatory" | "luteal";

export type Phase = {
  name: PhaseName;
  label: string;
  color: string; // can be a Tailwind token or hex
  tips?: string[]; // fill this later
};

export const phases: Phase[] = [
  {
    name: "menstrual",
    label: "Menstrual",
    color: "#F24535", // red-orange
  },
  {
    name: "follicular",
    label: "Follicular",
    color: "#F2AEEE", // soft pink
  },
  {
    name: "ovulatory",
    label: "Ovulatory",
    color: "#F2B035", // golden yellow
  },
  {
    name: "luteal",
    label: "Luteal",
    color: "#5941F2", // purple
  },
];