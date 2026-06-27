"use client";

import {
  CheckCircle2,
  Circle,
} from "lucide-react";

import { RuleField } from "@/types/journal/rule-types";
import { useRule } from "@/hooks/journal/useRule";

type RuleItemProps = {
  categoryId: string;
  field: RuleField;
};

export default function RuleItem({
  categoryId,
  field,
}: RuleItemProps) {
  const {
    updateField,
    isFieldCompleted,
  } = useRule();

  const completed =
    isFieldCompleted(field);

  return (
    <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
      <button
        className={`flex w-full items-center justify-between rounded-lg border px-3 py-3 transition-all ${
          completed
            ? "border-green-200 bg-green-50"
            : "border-gray-200 bg-white hover:bg-gray-50"
        }`}
        onClick={() =>
          updateField(
            categoryId,
            field.id,
            !completed
          )
        }
      >
        <div className="flex items-center gap-3">
          {completed ? (
            <CheckCircle2
              size={20}
              className="text-green-600"
            />
          ) : (
            <Circle
              size={20}
              className="text-gray-400"
            />
          )}

          <span>{field.label}</span>
        </div>

        <span className="rounded-full border px-2 py-1 text-[10px]">
          {field.required
            ? "Required"
            : "Optional"}
        </span>
      </button>
    </div>
  );
}