"use client";

import {
  Brain,
  CheckCircle2,
  ChevronDown,
  Circle,
  Lock,
  Play,
  Shield,
} from "lucide-react";

import { useRouter } from "next/navigation";

import JournalFooter from "@/components/journal/general/JournalFooter";
import JournalHeader from "@/components/journal/general/JournalHeader";

import RuleFramework from "@/components/journal/rule/RuleFramework";
import ReadlinessScore from "@/components/journal/rule/ReadlinessScore";
import StatCard from "@/components/journal/rule/StatCard";
import { QouteReminder } from "@/components/journal/rule/QouteReminder";

import { RuleProvider } from "@/providers/journal/RuleProvider";
import { useRule } from "@/hooks/journal/useRule";
import RuleChecklist from "@/components/journal/rule/RuleChecklist";

export default function RulePage() {
  return (
    <RuleProvider>
      <RulePageContent />
    </RuleProvider>
  );
}

function RulePageContent() {
  const router = useRouter();

  const {
    categories,
    readiness,
    canExecute,
    requiredFields,
    optionalFields,
    completedRequiredFields,
    completedOptionalFields,
  } = useRule();

  return (
    <div className="relative">
      {/* CONTENT */}
      <div className="space-y-6 p-4">
        {/* HEADER */}
        <div className="rounded-md bg-white shadow-sm">
          <JournalHeader
            currentStep="RULE"
            badges={["3 Analyses Added"]}
            journalDate="14 Jun 2026"
            isSaved={true}
          />
        </div>

        {/* MAIN */}
        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
          {/* LEFT */}
          <div className="space-y-6">
            <div className="rounded-md bg-white p-6 shadow-sm">
              <RuleFramework />

              <QouteReminder />
            </div>

            <div className="space-y-3">
              <RuleChecklist />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <div className="sticky top-4 rounded-md bg-white p-6 shadow-sm">
              <ReadlinessScore />

              <div className="mt-3 space-y-3">
                <StatCard
                  title="Required"
                  value={`${completedRequiredFields}/${requiredFields.length}`}
                  icon={<Shield size={18} />}
                />

                <StatCard
                  title="Optional"
                  value={`${completedOptionalFields}/${optionalFields.length}`}
                  icon={
                    <CheckCircle2 size={18} />
                  }
                />

                <StatCard
                  title="Categories"
                  value={categories.length}
                  icon={<Brain size={18} />}
                />

                <StatCard
                  title="Violations"
                  value={
                    requiredFields.length -
                    completedRequiredFields
                  }
                  icon={<Lock size={18} />}
                />
              </div>

              <div className="mt-6 rounded-xl border border-gray-300 p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <Play
                    size={16}
                    className="text-green-600"
                  />

                  <span className="font-medium">
                    Execution Status
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  {canExecute
                    ? "All required rules completed. Ready to execute trade."
                    : "Complete all required rules before execution."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <JournalFooter
        title={`Readiness ${readiness}%`}
        description={`${completedRequiredFields}/${requiredFields.length} required fields completed`}
        buttonText="Continue To Execution"
        disabled={!canExecute}
        onClick={() =>
          router.push(
            "/dashboard/journal/execute"
          )
        }
      />
    </div>
  );
}