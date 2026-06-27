import { useState } from "react";

export const TradeDirection = () => {
    const [tradeDirection, setTradeDirection] = useState<
        "BUY" | "SELL"
    >("BUY");
    
    return (
        <div>
            <div className="rounded-lg border border-gray-300 p-4">
                <div className="mb-3">
                    <label className="block text-sm font-semibold">
                        Trade Direction
                    </label>
                    <p className="text-xs">
                        There are only 2 options
                    </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={() =>
                        setTradeDirection("BUY")
                        }
                        className={`h-12 rounded-lg border border-gray-300 ${
                        tradeDirection === "BUY"
                            ? "border-green-500 bg-green-50"
                            : ""
                        }`}
                    >
                        BUY
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                        setTradeDirection("SELL")
                        }
                        className={`h-12 rounded-lg border border-gray-300 ${
                        tradeDirection === "SELL"
                            ? "border-red-500 bg-red-50"
                            : ""
                        }`}
                    >
                        SELL
                    </button>
                </div>
            </div>
        </div>
    )
}
