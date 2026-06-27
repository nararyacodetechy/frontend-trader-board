"use client";

export type EmotionItem = {
  value: string;
  emoji: string;
  description: string;
};

type EmotionLevelProps = {
  title: string;
  subtitle?: string;
  value: string;
  onChange: (value: string) => void;
  options: EmotionItem[];
};

export const EmotionLevel = ({
  title,
  subtitle,
  value,
  onChange,
  options,
}: EmotionLevelProps) => {
  const selectedEmotion = options.find(
    (item) => item.value === value
  );

  return (
    <div className="rounded-lg border border-gray-300 p-4">
      <div className="mb-3">
        <label className="block text-sm font-semibold">
          {title}
        </label>

        {subtitle && (
          <p className="text-xs">{subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {options.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={`rounded-lg border border-gray-300 p-3 transition-all hover:scale-[1.02]
            ${
              value === item.value
                ? "bg-blue-100"
                : ""
            }`}
          >
            <div className="text-3xl">
              {item.emoji}
            </div>

            <div className="mt-2 text-sm font-medium">
              {item.value}
            </div>
          </button>
        ))}
      </div>

      {selectedEmotion && (
        <div className="mt-4 rounded-md bg-blue-50 p-3">
          <p className="text-center text-sm">
            {selectedEmotion.description}
          </p>
        </div>
      )}
    </div>
  );
};