type Props = {
  selectedTimeframe: string;
  setSelectedTimeframe: (
    value: string
  ) => void;
  timeframes: string[];
};

export default function TimeframeSelector({
  selectedTimeframe,
  setSelectedTimeframe,
  timeframes,
}: Props) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">
            Timeframe
          </h3>

          <p className="text-xs text-muted-foreground">
            Select chart timeframe
          </p>
        </div>

        <div className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
          {selectedTimeframe}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {timeframes.map((item) => {
          const active =
            selectedTimeframe === item;

          return (
            <button
              key={item}
              type="button"
              onClick={() =>
                setSelectedTimeframe(item)
              }
              className={`
                relative overflow-hidden rounded-lg border p-2 transition-all

                ${
                  active
                    ? "border-black bg-black text-white shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              <div className="flex flex-col items-center">
                <span
                  className={`text-[10px]
                  ${
                    active
                      ? "text-gray-300"
                      : "text-muted-foreground"
                  }
                  `}
                >
                  TF
                </span>
                <span className="text-base">
                  {item}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}