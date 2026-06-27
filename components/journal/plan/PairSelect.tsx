"use client";

import { marketCategories } from "@/data/journal/plan/MarketCategoryData";
import { tradingPairs } from "@/data/journal/plan/TradingPairData";

interface PairSelectProps {
  category: string;
  pair: string;

  onCategoryChange: (value: string) => void;
  onPairChange: (value: string) => void;
}

export default function PairSelect({
  category,
  pair,
  onCategoryChange,
  onPairChange,
}: PairSelectProps) {
  const availablePairs =
    tradingPairs[
      category as keyof typeof tradingPairs
    ] ?? [];

  return (
    <div className="flex gap-4">
      <div>
        <label className="mb-2 block text-sm font-medium">
          Market
        </label>

        <select
          value={category}
          onChange={(e) =>
            onCategoryChange(e.target.value)
          }
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-black"
        >
          {marketCategories.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Pair
        </label>

        <select
          value={pair}
          onChange={(e) =>
            onPairChange(e.target.value)
          }
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-black"
        >
          {availablePairs.map((pair) => (
            <option
              key={pair}
              value={pair}
            >
              {pair}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}