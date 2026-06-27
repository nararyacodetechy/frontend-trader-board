"use client";

import { useState } from "react";
import { defaultTags } from "../../constants/analysis/tags";

export function useTags() {
  const [tags, setTags] =
    useState(defaultTags);

  const [selectedTags, setSelectedTags] =
    useState<string[]>([]);

  const [newTag, setNewTag] =
    useState("");

  const handleAddTag = () => {
    const trimmedTag =
      newTag.trim();

    if (!trimmedTag) return;

    const alreadyExists = tags.some(
      (tag) =>
        tag.toLowerCase() ===
        trimmedTag.toLowerCase()
    );

    if (alreadyExists) {
      alert("Tag already exists.");
      return;
    }

    setTags((prev) => [
      ...prev,
      trimmedTag,
    ]);

    setNewTag("");
  };

  const handleToggleTag = (
    tag: string
  ) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleDeleteTag = (
    tag: string
  ) => {
    setTags((prev) =>
      prev.filter((t) => t !== tag)
    );

    setSelectedTags((prev) =>
      prev.filter((t) => t !== tag)
    );
  };

  return {
    tags,
    selectedTags,
    newTag,
    setNewTag,
    handleAddTag,
    handleToggleTag,
    handleDeleteTag,
  };
}