"use client";

import React from "react";

import TimeframeSelector from "./TimeframeSelector";
import UploadSection from "./UploadSection";
import DescriptionInput from "./DescriptionInput";
import TagsSection from "./TagsSection";
import AnalysisPurposeSelector from "./AnalysisPurposeSelect";
import StrategySelector from "./StrategySelector";

type Props = {
  selectedTimeframe: string;
  setSelectedTimeframe: (
    value: string
  ) => void;

  // Porpuse dan Strategy 
  analysisPurpose: string;

  setAnalysisPurpose: (
    value: string
  ) => void;

  selectedStrategies: string[];

  handleToggleStrategy: (
    strategy: string
  ) => void;

  timeframes: string[];
  image: string;
  inputRef: React.RefObject<HTMLInputElement | null>;

  handleUpload: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  handleRemoveImage: () => void;

  description: string;

  setDescription: (
    value: string
  ) => void;

  tags: string[];

  selectedTags: string[];

  newTag: string;

  setNewTag: (
    value: string
  ) => void;

  handleAddTag: () => void;

  handleToggleTag: (
    tag: string
  ) => void;

  openManager: () => void;
};



export default function AnalysisFormSection({
  selectedTimeframe,
  setSelectedTimeframe,
  timeframes,
  image,
  analysisPurpose,
  setAnalysisPurpose,
  selectedStrategies,
  handleToggleStrategy,
  inputRef,
  handleUpload,
  description,
  setDescription,
  tags,
  selectedTags,
  newTag,
  setNewTag,
  handleAddTag,
  handleToggleTag,
  openManager,
  handleRemoveImage,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-dashed border-white/10">
      <AnalysisPurposeSelector
        value={analysisPurpose}
        onChange={setAnalysisPurpose}
      />

      <StrategySelector
        selectedStrategies={
          selectedStrategies
        }
        onToggle={
          handleToggleStrategy
        }
      />

      {/* TIMEFRAME */}
      <TimeframeSelector
        selectedTimeframe={
          selectedTimeframe
        }
        setSelectedTimeframe={
          setSelectedTimeframe
        }
        timeframes={timeframes}
      />

      {/* UPLOAD */}
      <UploadSection
        image={image}
        timeframe={selectedTimeframe}
        inputRef={inputRef}
        handleUpload={handleUpload}
        handleRemoveImage={
          handleRemoveImage
        }
      />

      {/* DESCRIPTION */}
      <DescriptionInput
        value={description}
        onChange={setDescription}
        timeframe={
          selectedTimeframe
        }
      />

      {/* TAGS */}
      <TagsSection
        tags={tags}
        selectedTags={
          selectedTags
        }
        newTag={newTag}
        setNewTag={setNewTag}
        handleAddTag={
          handleAddTag
        }
        handleToggleTag={
          handleToggleTag
        }
        openManager={openManager}
      />
    </div>
  );
}