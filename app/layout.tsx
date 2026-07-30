import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar"; // 👈 ১. Navbar ইম্পোর্ট করো
import { Toaster } from "react-hot-toast";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased">
        {/* 👈 ২. এখানে Navbar বসিয়ে দাও */}
        <Navbar />
        
        {/* পেজের মেইন কনটেন্ট */}
        {children}

        {/* টোস্ট নোটিফিকেশন */}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}