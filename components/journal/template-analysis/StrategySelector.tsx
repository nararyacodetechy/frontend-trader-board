"use client";

type Props = {
  selectedStrategies: string[];

  onToggle: (
    strategy: string
  ) => void;
};

const strategies = [
  {
    id: "smc",
    name: "Smart Money Concept",
    icon: "📊",
  },
  {
    id: "trend",
    name: "Trend Trading",
    icon: "📈",
  },
  {
    id: "range",
    name: "Range Trading",
    icon: "↔️",
  },
  {
    id: "breakout",
    name: "Breakout Trading",
    icon: "🚀",
  },
  {
    id: "supply-demand",
    name: "Supply & Demand",
    icon: "🎯",
  },
  {
    id: "scalp",
    name: "Scalping",
    icon: "⚡",
  },
];

export default function StrategySelector({
  selectedStrategies,
  onToggle,
}: Props) {
  return (
    <div>
      <div className="mb-2">
        <label className="block text-sm font-semibold">
          Trading Strategy
        </label>

        <p className="text-xs text-muted-foreground">
          Select all strategies used in this analysis
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {strategies.map(
          (strategy) => {
            const selected =
              selectedStrategies.includes(
                strategy.id
              );

            return (
              <button
                key={strategy.id}
                type="button"
                onClick={() =>
                  onToggle(strategy.id)
                }
                className={`
                  flex items-center gap-2 rounded-lg border p-3 text-left transition-all

                  ${
                    selected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:bg-gray-50"
                  }
                `}
              >
                <span>
                  {strategy.icon}
                </span>

                <span className="text-sm">
                  {strategy.name}
                </span>
              </button>
            );
          }
        )}
      </div>
    </div>
  );
}