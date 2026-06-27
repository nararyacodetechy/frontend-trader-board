"use client";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* HEADER (FIXED, tidak ikut scroll) */}
        <div className="h-15 flex items-center justify-between px-4 z-10 border-b border-[#c7c7c9]">
          <Navbar />
        </div>

        {/* CONTENT (ONLY THIS SCROLLS) */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}