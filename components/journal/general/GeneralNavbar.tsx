"use client";

import Link from "next/link";

import {
  ChevronRight,
} from "lucide-react";

import { usePathname } from "next/navigation";

const steps = [
  {
    label: "PLAN",
    href: "/dashboard/analysis/plan",
  },
  {
    label: "EXECUTE",
    href: "/dashboard/analysis/execute",
  },
  {
    label: "RESULT",
    href: "/dashboard/analysis/result",
  },
  {
    label: "RIVIEW",
    href: "/dashboard/analysis/riview",
  },
];

export default function AnalysisNavbar() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/dashboard"
        className="text-sm"
      >
        HOME
      </Link>

      <ChevronRight
        size={16}
        className=""
      />

      {steps.map((step, index) => {
        const active =
          pathname === step.href;

        return (
          <div
            key={step.href}
            className="flex items-center gap-3"
          >
            <Link
              href={step.href}
              className={`text-sm transition ${
                active
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {step.label}
            </Link>

            {index !==
              steps.length - 1 && (
              <ChevronRight
                size={16}
                className="text-white/20"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}