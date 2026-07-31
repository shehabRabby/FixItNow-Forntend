import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar"; // 👈 ১. Navbar ইম্পোর্ট করো
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "FixItNow",
  description: "Book trusted experts or provide services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="antialiased">
        <Navbar />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}