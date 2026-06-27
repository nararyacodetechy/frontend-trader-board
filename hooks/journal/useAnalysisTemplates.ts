"use client";

import { useState, type ChangeEvent, type RefObject } from "react";
import type { AnalysisTemplate } from "@/types/journal/template-analysis";

type UseAnalysisTemplatesParams = {
  inputRef?: RefObject<HTMLInputElement | null>;
  initialTimeframe?: string;
};

function createTemplate(timeframe = "15m"): AnalysisTemplate {
  return {
    id: Date.now(),
    timeframe,
    analysisPurpose: "",
    strategyIds: [],
    image: "",
    description: "",
    tags: [],
  };
}

export function useAnalysisTemplates({
  inputRef,
  initialTimeframe = "15m",
}: UseAnalysisTemplatesParams = {}) {
  const [templates, setTemplates] = useState<AnalysisTemplate[]>([
    createTemplate(initialTimeframe),
  ]);

  const resetInput = () => {
    if (inputRef?.current) {
      inputRef.current.value = "";
    }
  };

  const updateTemplate = (
    id: number,
    updated: Partial<AnalysisTemplate>
  ) => {
    setTemplates((prev) =>
      prev.map((template) =>
        template.id === id ? { ...template, ...updated } : template
      )
    );
  };

  const addTemplate = () => {
    setTemplates((prev) => [...prev, createTemplate(initialTimeframe)]);
  };

  const removeTemplate = (id: number) => {
    setTemplates((prev) => prev.filter((template) => template.id !== id));
  };

  const uploadImage = (
    e: ChangeEvent<HTMLInputElement>,
    templateId: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    updateTemplate(templateId, {
      image: imageUrl,
    });

    resetInput();
  };

  const removeImage = (templateId: number) => {
    updateTemplate(templateId, {
      image: "",
    });

    resetInput();
  };

  const toggleStrategy = (templateId: number, strategyId: string) => {
    setTemplates((prev) =>
      prev.map((template) => {
        if (template.id !== templateId) return template;

        const exists = template.strategyIds.includes(strategyId);

        return {
          ...template,
          strategyIds: exists
            ? template.strategyIds.filter((id) => id !== strategyId)
            : [...template.strategyIds, strategyId],
        };
      })
    );
  };

  const toggleTag = (templateId: number, tag: string) => {
    setTemplates((prev) =>
      prev.map((template) => {
        if (template.id !== templateId) return template;

        const exists = template.tags.includes(tag);

        return {
          ...template,
          tags: exists
            ? template.tags.filter((t) => t !== tag)
            : [...template.tags, tag],
        };
      })
    );
  };

  return {
    templates,
    setTemplates,
    updateTemplate,
    addTemplate,
    removeTemplate,
    uploadImage,
    removeImage,
    toggleStrategy,
    toggleTag,
  };
}