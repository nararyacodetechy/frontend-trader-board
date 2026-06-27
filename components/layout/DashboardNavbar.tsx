"use client";

import {
  ChevronRight,
} from "lucide-react";

export default function DashboardNavbar() {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="">
        HOME
      </span>

      <ChevronRight
        size={16}
        className=""
      />

      <span className="">
        DASHBOARD
      </span>
    </div>
  );
}