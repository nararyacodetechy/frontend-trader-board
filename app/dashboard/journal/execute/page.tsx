"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import JournalHeader from "@/components/journal/general/JournalHeader";
import AnalysisFormSection from "@/components/journal/template-analysis/AnalysisFormSection";
import JournalFooter from "@/components/journal/general/JournalFooter";

import { timeframes } from "@/constants/analysis/timeframes";
import { useAnalysisTemplates } from "@/hooks/journal/useAnalysisTemplates";

import { TradeDirection } from "@/components/journal/execute/TradeDirection";
import { ConfidenceLevel } from "@/components/journal/execute/ConfidenceLevel";
import { EmotionLevel } from "@/components/journal/execute/EmotionLevel";
import { ExecutionData } from "@/components/journal/execute/ExecutionData";
import { EntryConfirmation } from "@/components/journal/execute/EntryConfirmation";
import { useTags } from "@/hooks/journal/useTags";
import TagManagerModal from "@/components/journal/template-analysis/TagManagerModal";

export default function ExecutePage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    templates,
    addTemplate,
    updateTemplate,
    uploadImage,
    removeImage,
    toggleStrategy,
    toggleTag,
  } = useAnalysisTemplates({
    inputRef
  });
  const [showTagManager, setShowTagManager] = useState(false);
  const { tags, newTag, setNewTag, handleAddTag, handleDeleteTag } = useTags();

  return (
    <div className="flex flex-col">
      {/* HEADER */}
      <div className="p-4">
        <JournalHeader
          currentStep="EXECUTE"
          badges={["24/28 Rules Passed", "86% Ready"]}
          journalDate="14 Jun 2026"
          isSaved={true}
        />
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-12 gap-4 px-4 pb-4">
        {/* LEFT */}
        <div className="col-span-5 h-fit shadow-sm">
          <div className="flex flex-col gap-4 rounded-md bg-white p-4">
            <EntryConfirmation />
            <TradeDirection />
            <ConfidenceLevel />
            <EmotionLevel />
            <ExecutionData />
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-7 flex flex-col gap-6">
          {templates.map((template) => (
            <div key={template.id} className="rounded-md bg-white shadow-sm">
              <div className="p-4">
                <AnalysisFormSection
                  selectedTimeframe={template.timeframe}
                  setSelectedTimeframe={(value) =>
                    updateTemplate(template.id, { timeframe: value })
                  }
                  timeframes={timeframes}
                  image={template.image}
                  analysisPurpose={template.analysisPurpose}
                  setAnalysisPurpose={(value) =>
                    updateTemplate(template.id, { analysisPurpose: value })
                  }
                  selectedStrategies={template.strategyIds}
                  handleToggleStrategy={(strategyId) =>
                    toggleStrategy(template.id, strategyId)
                  }
                  inputRef={inputRef}
                  handleUpload={(e) => uploadImage(e, template.id)}
                  handleRemoveImage={() => removeImage(template.id)}
                  description={template.description}
                  setDescription={(value) =>
                    updateTemplate(template.id, { description: value })
                  }
                  tags={tags}
                  selectedTags={template.tags}
                  newTag={newTag}
                  setNewTag={setNewTag}
                  handleAddTag={handleAddTag}
                  handleToggleTag={(tag) => toggleTag(template.id, tag)}
                  openManager={() => setShowTagManager(true)}
                />
              </div>
            </div>
          ))}

          <button
            onClick={addTemplate}
            className="min-h-100 bg-white shadow-sm p-4 hover:bg-gray-50"
          >
            <div className="flex h-full w-full flex-col items-center justify-center rounded-md border border-dashed border-gray-300">
              <p className="mb-2 text-3xl">+</p>
              <p className="text-sm">Add New Analysis</p>
            </div>
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <JournalFooter
        title="Execution Completed"
        description="Save your entry details before continuing."
        buttonText="Continue To Result"
        onClick={() => router.push("/dashboard/journal/result")}
      />

      <TagManagerModal
        open={showTagManager}
        onClose={() => setShowTagManager(false)}
        tags={tags}
        newTag={newTag}
        setNewTag={setNewTag}
        handleAddTag={handleAddTag}
        handleDeleteTag={handleDeleteTag}
      />
    </div>
  );
}