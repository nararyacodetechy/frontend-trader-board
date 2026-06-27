"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import AnalysisFormSection from "@/components/journal/template-analysis/AnalysisFormSection";
import JournalHeader from "@/components/journal/general/JournalHeader";
import TagManagerModal from "@/components/journal/template-analysis/TagManagerModal";
import JournalFooter from "@/components/journal/general/JournalFooter";
import PairSelect from "@/components/journal/plan/PairSelect";
import TradeDateSelect from "@/components/journal/plan/TradeDateSelect";

import { timeframes } from "@/constants/analysis/timeframes";
import { useTags } from "@/hooks/journal/useTags";
import { useAnalysisTemplates } from "@/hooks/journal/useAnalysisTemplates";
import { tradingPairs } from "@/data/journal/plan/TradingPairData";

export default function PlanPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    templates,
    addTemplate,
    uploadImage,
    removeImage,
    toggleStrategy,
    toggleTag,
    updateTemplate,
  } = useAnalysisTemplates({ inputRef });

  const [journalInfo, setJournalInfo] = useState({
    pair: "",
    tradeName: "",
    tradeDate: new Date().toISOString().split("T")[0],
    strategyId: "",
    setupId: "",
  });

  const [marketCategory, setMarketCategory] = useState<string>("forex");
  const [pair, setPair] = useState<string>(tradingPairs.forex[0]);
  const [showTagManager, setShowTagManager] = useState(false);

  const { tags, newTag, setNewTag, handleAddTag, handleDeleteTag } = useTags();

  const handleCategoryChange = (category: string) => {
    setMarketCategory(category);

    const pairs = tradingPairs[category as keyof typeof tradingPairs];
    setPair(pairs[0]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 pb-0 flex flex-col gap-4">
        <JournalHeader
          currentStep="PLAN"
          badges={["Journal #3 Today"]}
          journalDate="14 Jun 2026"
          isSaved={true}
        />

        <div>
          <div className="rounded-md bg-white shadow-sm p-4">
            <div className="flex gap-4 w-full">
              <div className="col-span-3 w-fit">
                <TradeDateSelect
                  value={journalInfo.tradeDate}
                  onChange={(value) =>
                    setJournalInfo((prev) => ({
                      ...prev,
                      tradeDate: value,
                    }))
                  }
                />
              </div>

              <div className="col-span-7 w-full">
                <label className="mb-2 block text-sm font-medium">
                  Trade Name
                </label>

                <input
                  type="text"
                  value={journalInfo.tradeName}
                  onChange={(e) =>
                    setJournalInfo((prev) => ({
                      ...prev,
                      tradeName: e.target.value,
                    }))
                  }
                  placeholder="Contoh: London Breakout Buy"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-black"
                />
              </div>

              <div className="col-span-2">
                <PairSelect
                  category={marketCategory}
                  pair={pair}
                  onCategoryChange={handleCategoryChange}
                  onPairChange={setPair}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4">
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

      <JournalFooter
        title={`${templates.length} Analysis Added`}
        description="Complete your market analysis before moving to rules."
        buttonText="Continue To Rules"
        onClick={() => router.push("/dashboard/journal/rule")}
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