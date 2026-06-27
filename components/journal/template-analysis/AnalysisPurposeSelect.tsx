"use client";

type Props = {
  value: string;
  onChange: (
    value: string
  ) => void;
};

const purposes = [
  "Market Bias",
  "Market Structure",
  "Liquidity Mapping",
  "POI Identification",
  "Execution Setup",
];

export default function AnalysisPurposeSelector({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="">
        <label className="block text-sm font-semibold">
          Analysis Purpose
        </label>
        <p className="block text-xs font-medium">
          Select your specific analysis purpose here
        </p>
      </div>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-black"
      >
        <option value="">
          Select Purpose
        </option>

        {purposes.map((purpose) => (
          <option
            key={purpose}
            value={purpose}
          >
            {purpose}
          </option>
        ))}
      </select>
    </div>
  );
}