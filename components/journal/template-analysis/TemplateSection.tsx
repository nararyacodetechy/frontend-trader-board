"use client";

import { AnalysisTemplate } from "@/types/journal/template-analysis";

type Props = {
  templates: AnalysisTemplate[];

  activeTemplateId: number;

  setActiveTemplateId: (
    id: number
  ) => void;

  handleAddTemplate: () => void;
};

export default function TemplateSection({
  templates,
  activeTemplateId,
  setActiveTemplateId,
  handleAddTemplate,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {templates.map((template) => {
        const active =
          template.id === activeTemplateId;

        return (
          <button
            key={template.id}
            onClick={() =>
              setActiveTemplateId(
                template.id
              )
            }
            className={`overflow-hidden rounded-xl p-3 text-left transition ${
              active
                ? "border-white"
                : "border-white/10 hover:border-white/30"
            }`}
          >
            {/* IMAGE */}
            <div className="mb-3 overflow-hidden rounded-lg bg-white/5">
              {template.image ? (
                <img
                  src={template.image}
                  alt="template"
                  className="h-40 w-full object-cover"
                />
              ) : (
                <div className="flex h-40 items-center justify-center text-sm text-white/30">
                  No Chart
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/40">
                  Timeframe
                </p>

                <p className="text-sm font-medium">
                  {template.timeframe}
                </p>
              </div>

              <div>
                <p className="mb-1 text-sm text-white/40">
                  Description
                </p>

                <p className="line-clamp-2 text-sm text-white/70">
                  {template.description ||
                    "No description"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {template.tags
                  ?.slice(0, 3)
                  .map((tag) => (
                    <div
                      key={tag}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs"
                    >
                      {tag}
                    </div>
                  ))}
              </div>
            </div>
          </button>
        );
      })}

      {/* ADD */}
      <button
        onClick={handleAddTemplate}
        className="flex min-h-80 items-center justify-center rounded-xl border border-dashed border-white/10 transition hover:bg-white/5"
      >
        <div className="text-center">
          <p className="mb-2 text-3xl text-white/40">
            +
          </p>

          <p className="text-sm text-white/40">
            Add New Template
          </p>
        </div>
      </button>
    </div>
  );
}