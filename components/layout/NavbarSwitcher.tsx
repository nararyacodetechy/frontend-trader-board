"use client";

import { usePathname } from "next/navigation";

import AnalysisNavbar from "@/components/journal/general/GeneralNavbar";
import DashboardNavbar from "./DashboardNavbar";

export default function NavbarSwitcher() {
  const pathname = usePathname();

  // ANALYSIS
  if (
    pathname.startsWith("/dashboard/analysis")
  ) {
    return <AnalysisNavbar />;
  }

  // DEFAULT DASHBOARD
  return <DashboardNavbar />;
}