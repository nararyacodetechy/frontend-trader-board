"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import JournalHeader from "@/components/journal/general/JournalHeader";
import JournalFooter from "@/components/journal/general/JournalFooter";
import AnalysisFormSection from "@/components/journal/template-analysis/AnalysisFormSection";
import TagManagerModal from "@/components/journal/template-analysis/TagManagerModal";

import { timeframes } from "@/constants/analysis/timeframes";
import { useAnalysisTemplates } from "@/hooks/journal/useAnalysisTemplates";
import { useTags } from "@/hooks/journal/useTags";

import { EmotionLevel } from "@/components/journal/execute/EmotionLevel";
import { ExecutionDataSection } from "@/components/journal/execute/ExecutionData";

import { defaultResultFields } from "@/data/journal/result/ResultData";
import { resultEmotions } from "@/data/journal/result/EmotionData";

export default function ResultPage() {
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

  const [emotion, setEmotion] = useState("Calm");
  const [resultFields, setResultFields] = useState(defaultResultFields);

  const updateResultField = (id: number, value: string) => {
    setResultFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  return (
    <div className="flex flex-col">
      <div className="p-4">
        <JournalHeader
          currentStep="RESULT"
          badges={["24/28 Rules Passed", "86% Ready"]}
          journalDate="14 Jun 2026"
          isSaved={true}
        />
      </div>

      <div className="grid grid-cols-12 gap-4 px-4 pb-4">
        <div className="col-span-5 h-fit shadow-sm">
          <div className="flex flex-col gap-4 rounded-md bg-white p-4">
            <EmotionLevel
              title="Emotion After Entry"
              subtitle="How did you feel after the trade?"
              value={emotion}
              onChange={setEmotion}
              options={resultEmotions}
            />

            <ExecutionDataSection
              title="Result Data"
              subtitle="Summarize the final trade outcome"
              fields={resultFields}
              onChange={updateResultField}
              columns={2}
            />
          </div>
        </div>

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

          <div className="rounded-md bg-white p-4 shadow-sm">
            <button
              onClick={addTemplate}
              className="flex min-h-100 w-full items-center justify-center rounded-md border border-dashed border-gray-300 hover:bg-gray-50"
            >
              <div className="text-center">
                <p className="mb-2 text-3xl">+</p>
                <p className="text-sm">Add New Analysis</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <JournalFooter
        title="Trade End"
        description="Good or Bad it doesn't matter."
        buttonText="Continue To Review"
        onClick={() => router.push("/dashboard/journal/review")}
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