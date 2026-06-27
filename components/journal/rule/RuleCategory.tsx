"use client";

import { ChevronDown } from "lucide-react";

import { RuleCategory as RuleCategoryType } from "@/types/journal/rule-types";
import { useRule } from "@/hooks/journal/useRule";
import RuleItem from "./RuleItem";

type RuleCategoryProps = {
  category: RuleCategoryType;
};

export default function RuleCategory({
  category,
}: RuleCategoryProps) {
  const {
    openCategory,
    setOpenCategory,
    isFieldCompleted,
  } = useRule();

  const requiredCategoryFields =
    category.fields.filter(
      (field) => field.required
    );

  const optionalCategoryFields =
    category.fields.filter(
      (field) => !field.required
    );

  const completedRequired =
    requiredCategoryFields.filter(
      isFieldCompleted
    ).length;

  const completedOptional =
    optionalCategoryFields.filter(
      isFieldCompleted
    ).length;

  const progress =
    requiredCategoryFields.length === 0
      ? 100
      : Math.round(
          (completedRequired /
            requiredCategoryFields.length) *
            100
        );

  const opened =
    openCategory === category.id;

  return (
    <div
      className={`overflow-hidden rounded-xl bg-white shadow-sm transition-all ${
        opened
          ? "ring-1 ring-gray-200"
          : ""
      }`}
    >
      {/* HEADER */}
      <button
        className="w-full p-4"
        onClick={() =>
          setOpenCategory(
            opened
              ? null
              : category.id
          )
        }
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold ${
                progress === 100
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {progress}%
            </div>

            <div className="text-left">
              <h3 className="font-medium">
                {category.name}
              </h3>

              <p className="text-xs text-muted-foreground">
                Required{" "}
                {completedRequired}/
                {
                  requiredCategoryFields.length
                }
                {" • "}
                Optional{" "}
                {completedOptional}/
                {
                  optionalCategoryFields.length
                }
              </p>
            </div>
          </div>

          <ChevronDown
            size={18}
            className={`transition-transform ${
              opened
                ? "rotate-180"
                : ""
            }`}
          />
        </div>

        {/* PROGRESS BAR */}
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full transition-all ${
              progress === 100
                ? "bg-green-500"
                : "bg-black"
            }`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </button>

      {/* CONTENT */}
      {opened && (
        <div className="border-t border-gray-300 bg-gray-50/50 p-4">
          <div className="space-y-2">
            {category.fields.map(
              (field) => (
                <RuleItem
                  key={field.id}
                  categoryId={
                    category.id
                  }
                  field={field}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}