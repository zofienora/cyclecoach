import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/UserContext";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});


export const metadata: Metadata = {
  title: "CycleCoach",
  description: "Your smart companion for cycle-based training and nutrition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${dmSans.variable} font-sans`}
      >
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
