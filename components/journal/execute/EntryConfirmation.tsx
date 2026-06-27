"use client";

import { useMemo, useState } from "react";
import { defaultEntryConfirmations } from "@/data/journal/execute/EntryConfirmationData";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Plus,
} from "lucide-react";

export function EntryConfirmation() {
    const [confirmations, setConfirmations] = useState(
        defaultEntryConfirmations
    );
    
    const confirmedCount = confirmations.filter(
        (item) => item.checked
    ).length;
    
    const completionPercentage = useMemo(() => {
        if (confirmations.length === 0) return 0;
    
        return (
        (confirmedCount / confirmations.length) * 100
        );
    }, [confirmedCount, confirmations.length]);
    
    const entryStrength = useMemo(() => {
        if (completionPercentage < 50) {
        return {
            label: "Weak",
            textColor: "text-red-500",
            bgColor: "bg-red-500",
            badge: "bg-red-50 text-red-600",
        };
        }
    
        if (completionPercentage < 80) {
        return {
            label: "Moderate",
            textColor: "text-yellow-500",
            bgColor: "bg-yellow-500",
            badge: "bg-yellow-50 text-yellow-600",
        };
        }
    
        return {
        label: "Strong",
        textColor: "text-green-500",
        bgColor: "bg-green-500",
        badge: "bg-green-50 text-green-600",
        };
    }, [completionPercentage]);

  const toggleConfirmation = (id: number) => {
    setConfirmations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              checked: !item.checked,
            }
          : item
      )
    );
  };

  const toggleExpand = (id: number) => {
    setConfirmations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              expanded: !item.expanded,
            }
          : item
      )
    );
  };

  const updateTitle = (
    id: number,
    value: string
  ) => {
    setConfirmations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              title: value,
            }
          : item
      )
    );
  };

  const updateNote = (
    id: number,
    value: string
  ) => {
    setConfirmations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              note: value,
            }
          : item
      )
    );
  };

  const addConfirmation = () => {
    setConfirmations((prev) => [
      ...prev.map((item) => ({
        ...item,
        expanded: false,
      })),
      {
        id: Date.now(),
        title: "New Confirmation",
        checked: false,
        note: "",
        expanded: true,
      },
    ]);
  };

  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4">
      {/* HEADER */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-semibold">
            Entry Confirmation
          </h3>

          <p className="text-sm text-muted-foreground">
            What confirms this trade setup is valid?
          </p>
        </div>

        <div
          className={`rounded-lg px-3 py-2 text-sm font-semibold ${entryStrength.badge}`}
        >
          {confirmedCount}/{confirmations.length}
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {confirmations.map((item) => (
          <div
            key={item.id}
            className={`
              rounded-lg border border-gray-300 transition-all
              ${
                item.checked
                  ? "border-green-200 bg-green-50/40"
                  : ""
              }
            `}
          >
            <div className="flex items-center gap-3 p-3">
              <button
                type="button"
                onClick={() =>
                  toggleConfirmation(item.id)
                }
              >
                {item.checked ? (
                  <CheckCircle2
                    size={22}
                    className="text-green-500"
                  />
                ) : (
                  <Circle
                    size={22}
                    className="text-gray-400"
                  />
                )}
              </button>

              <div className="flex-1">
                {item.expanded ? (
                  <input
                    value={item.title}
                    onChange={(e) =>
                      updateTitle(
                        item.id,
                        e.target.value
                      )
                    }
                    placeholder="Confirmation title..."
                    className="w-full rounded border-b border-gray-300 px-3 py-2 text-sm focus:outline-1 focus:outline-gray-300"
                  />
                ) : (
                  <p className="text-sm font-medium">
                    {item.title}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  toggleExpand(item.id)
                }
              >
                {item.expanded ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
            </div>

            {item.expanded && (
              <div className="border-t border-gray-300 p-3">
                <label className="mb-2 block text-xs font-medium text-muted-foreground">
                  Observation Note
                </label>

                <textarea
                  rows={3}
                  value={item.note}
                  onChange={(e) =>
                    updateNote(
                      item.id,
                      e.target.value
                    )
                  }
                  placeholder="Example: Bullish engulfing appears exactly at H1 demand zone..."
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ADD */}
      <button
        type="button"
        onClick={addConfirmation}
        className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-dashed text-sm font-medium hover:bg-gray-50"
      >
        <Plus size={16} />
        Add Confirmation
      </button>

      {/* SUMMARY */}
      <div className="mt-4 rounded-lg bg-gray-50 p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Entry Strength
          </span>

          <span
            className={`text-sm font-semibold ${entryStrength.textColor}`}
          >
            {entryStrength.label}
          </span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full transition-all ${entryStrength.bgColor}`}
            style={{
                width: `${completionPercentage}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}