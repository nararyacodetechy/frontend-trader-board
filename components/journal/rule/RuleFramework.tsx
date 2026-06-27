"use client";

import { Shield } from "lucide-react";
import { useState } from "react";

import { RuleField } from "@/types/journal/rule-types";
import { useRule } from "@/hooks/journal/useRule";

export default function RuleFramework() {
  const [isRuleModalOpen, setIsRuleModalOpen] =
    useState(false);

  const {
    categories,

    renameCategory,
    addCategory,

    renameRule,
    toggleRequired,
    changeRuleType,

    addRule,
    deleteRule,
  } = useRule();

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Shield size={18} />

            <h2 className="font-semibold">
              Rule Framework
            </h2>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            Klik Manage Rules untuk melihat dan
            mengatur seluruh framework trading.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsRuleModalOpen(true)
          }
          className="rounded-md border border-gray-300 px-4 py-2 text-sm shadow-md hover:bg-muted hover:shadow-none"
        >
          Manage Rules
        </button>
      </div>

      {isRuleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-xl bg-white shadow-xl">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-gray-300 p-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Rule Framework Editor
                </h2>

                <p className="text-sm text-muted-foreground">
                  Edit semua rule dan sesuaikan
                  framework trading kamu.
                </p>
              </div>

              <button
                onClick={() =>
                  setIsRuleModalOpen(false)
                }
                className="rounded-md border px-3 py-1 text-sm hover:bg-muted"
              >
                Close
              </button>
            </div>

            {/* CONTENT */}
            <div className="grid gap-6 p-4 lg:grid-cols-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="rounded-xl border border-gray-300 p-4 shadow-md"
                >
                  {/* CATEGORY NAME */}
                  <input
                    className="w-full rounded-md border border-gray-400 p-2 font-semibold"
                    value={category.name}
                    onChange={(e) =>
                      renameCategory(
                        category.id,
                        e.target.value
                      )
                    }
                  />

                  {/* RULES */}
                  <div className="mt-4 space-y-2">
                    {category.fields.map((field) => (
                      <div
                        key={field.id}
                        className="flex items-center gap-3 rounded-md bg-muted/30 px-3 py-2 shadow-sm"
                      >
                        {/* LABEL */}
                        <input
                          className="flex-1 bg-transparent text-sm outline-none"
                          placeholder="Rule name..."
                          value={field.label}
                          onChange={(e) =>
                            renameRule(
                              category.id,
                              field.id,
                              e.target.value
                            )
                          }
                        />

                        {/* TYPE */}
                        <select
                          className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs"
                          value={field.type}
                          onChange={(e) =>
                            changeRuleType(
                              category.id,
                              field.id,
                              e.target
                                .value as RuleField["type"]
                            )
                          }
                        >
                          <option value="checkbox">
                            Checklist
                          </option>
                        </select>

                        {/* REQUIRED */}
                        <button
                          onClick={() =>
                            toggleRequired(
                              category.id,
                              field.id
                            )
                          }
                          className={`rounded-md border px-2 py-1 text-xs ${
                            field.required
                              ? "border-gray-300 bg-black text-white"
                              : "border-gray-300 text-gray-600"
                          }`}
                        >
                          {field.required
                            ? "R"
                            : "O"}
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            deleteRule(
                              category.id,
                              field.id
                            )
                          }
                          className="text-sm text-gray-400 hover:text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* ADD RULE */}
                  <button
                    onClick={() =>
                      addRule(category.id)
                    }
                    className="mt-3 w-full rounded-lg border border-dashed py-3 text-sm text-muted-foreground hover:bg-muted"
                  >
                    + Add New Rule
                  </button>
                </div>
              ))}
            </div>
                        {/* FOOTER */}
                        <div className="flex items-center justify-between border-t border-gray-300 p-4">
              {/* ADD CATEGORY */}
              <button
                onClick={addCategory}
                className="rounded-md border px-4 py-2 text-sm hover:bg-muted"
              >
                + Add New Section
              </button>

              {/* ACTIONS */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setIsRuleModalOpen(false)
                  }
                  className="rounded-md border px-4 py-2 text-sm hover:bg-muted"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    console.log(
                      "Current Rule Framework:",
                      categories
                    );

                    setIsRuleModalOpen(false);
                  }}
                  className="rounded-md bg-black px-4 py-2 text-sm text-white"
                >
                  Save Rules
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}