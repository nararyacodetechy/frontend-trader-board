"use client";

import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
} from "lucide-react";

interface JournalHeaderProps {
  currentStep:
    | "PLAN"
    | "RULE"
    | "EXECUTE"
    | "RESULT"
    | "REVIEW";

  badges: string[];

  journalDate: string;

  isSaved?: boolean;

  onDateClick?: () => void;
}

export default function JournalHeader({
  currentStep,
  badges,
  journalDate,
  isSaved = false,
  onDateClick,
}: JournalHeaderProps) {
  const router = useRouter();

  const steps = [
    {
      label: "PLAN",
      path: "/dashboard/journal/plan",
    },
    {
      label: "RULE",
      path: "/dashboard/journal/rule",
    },
    {
      label: "EXECUTE",
      path: "/dashboard/journal/execute",
    },
    {
      label: "RESULT",
      path: "/dashboard/journal/result",
    },
    {
      label: "REVIEW",
      path: "/dashboard/journal/review",
    },
  ];

  const handleStepClick = (
    path: string
  ) => {
    router.push(path);
  };

  return (
    <div className="flex items-center justify-between rounded-md bg-white p-4 shadow-sm">
      {/* LEFT */}
      <div className="flex items-center gap-3 text-sm font-medium">
        {steps.map((step, index) => {
          const active =
            currentStep === step.label;

          return (
            <div
              key={step.label}
              className="flex items-center gap-3"
            >
              <button
                onClick={() =>
                  handleStepClick(
                    step.path
                  )
                }
                className={`transition ${
                  active
                    ? "text-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {step.label}
              </button>

              {index !==
                steps.length - 1 && (
                <span className="text-gray-300">
                  &gt;
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap items-center justify-end gap-2">
        {/* REMINDER */}
        {badges.map((badge) => (
          <div
            key={badge}
            className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
          >
            {badge}
          </div>
        ))}

        {/* DATE */}
        <button
          onClick={onDateClick}
          className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-200"
        >
          <CalendarDays size={14} />
          {journalDate}
        </button>

        {/* STATUS */}
        <div
          className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm ${
            isSaved
              ? "bg-green-50 text-green-700"
              : "bg-orange-50 text-orange-700"
          }`}
        >
          {isSaved ? (
            <>
              <CheckCircle2 size={14} />
              Saved
            </>
          ) : (
            <>
              <Clock3 size={14} />
              Draft
            </>
          )}
        </div>
      </div>
    </div>
  );
}