"use client";

import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: ReactNode;
  icon: ReactNode;
};

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-md border border-gray-300 p-5">
      <div className="flex items-center justify-between">
        {icon}

        <span className="text-2xl font-bold">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {title}
      </p>
    </div>
  );
}