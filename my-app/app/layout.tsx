import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // adjust weights as needed
  variable: '--font-poppins',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "CycleCoach",
  description: "Dein smarter Begleiter für zyklusbasiertes Training & Ernährung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
