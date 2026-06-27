"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="h-full p-10">
      DASHBOARD STATISTIC
    </div>
  );
}