import type { Metadata } from "next";

import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata: Metadata = {
  title: "Dashboard | TraderStairs",
  description:
    "Professional trading dashboard",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}