import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar"; 
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/shared/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
