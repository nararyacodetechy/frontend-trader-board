"use client";

import { useRule } from "@/hooks/journal/useRule";

import RuleCategory from "./RuleCategory";

export default function RuleChecklist() {
  const { categories } = useRule();

  if (categories.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-muted-foreground">
        No rule category available.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <RuleCategory
          key={category.id}
          category={category}
        />
      ))}
    </div>
  );
}