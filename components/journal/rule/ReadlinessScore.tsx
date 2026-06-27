"use client";

import { useRule } from "@/hooks/journal/useRule";

export default function ReadlinessScore() {
  const { readiness } = useRule();

  return (
    <div className="rounded-lg border border-gray-300 p-4 flex flex-col gap-2">
      <h2 className="text-center font-semibold">
        Readiness Score
      </h2>

      <div className="text-center">
        <div className="text-5xl font-bold">
          {readiness}%
        </div>

        <p className="text-sm text-muted-foreground">
          {readiness >= 100
            ? "Ready"
            : readiness >= 70
            ? "Almost Ready"
            : "Not Ready"}
        </p>
      </div>

      <div className="overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{
            width: `${readiness}%`,
          }}
        />
      </div>
    </div>
  );
}