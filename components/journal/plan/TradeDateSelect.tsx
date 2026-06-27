"use client";

interface TradeDateSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TradeDateSelect({
  value,
  onChange,
}: TradeDateSelectProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        Trade Date
      </label>

      <input
        type="date"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-black"
      />
    </div>
  );
}