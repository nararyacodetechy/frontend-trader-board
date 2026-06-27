"use client";

import {
  Plus,
  Settings2,
} from "lucide-react";

type Props = {
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

export default function TagsSection({
  tags,
  selectedTags,
  newTag,
  setNewTag,
  handleAddTag,
  handleToggleTag,
  openManager,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>

        <p className="text-sm font-semibold">
          Tags
        </p>
        <p className="text-xs">Select all related tags</p>
        </div>
        <button
          onClick={openManager}
          className="rounded-lg border border-gray-400 p-2 transition hover:bg-white/10"
        >
          <Settings2 size={16} />
        </button>
      </div>

      {/* TAG SELECTOR */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const active =
            selectedTags.includes(tag);

          return (
            <button
              key={tag}
              onClick={() =>
                handleToggleTag(tag)
              }
              className={`rounded-lg border px-3 py-2 text-sm transition ${
                active
                  ? "border-black bg-black text-white"
                  : "border-gray-400 bg-white hover:bg-white"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* QUICK ADD */}
      <div className="flex gap-2">
        <input
          value={newTag}
          onChange={(e) =>
            setNewTag(e.target.value)
          }
          placeholder="Quick add tag..."
          className="h-10 flex-1 rounded-lg border border-gray-400 bg-white/5 px-4 text-sm outline-none"
        />

        <button
          onClick={handleAddTag}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}