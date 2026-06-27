import { useState } from 'react'

export const ConfidenceLevel = () => {
    const [confidence, setConfidence] =
        useState(8);

    const getConfidenceColor = (value: number) => {
        if (value <= 3) return "text-red-500";
        if (value <= 6) return "text-yellow-500";
        return "text-green-500";
    };
    
    const getConfidenceLabel = (value: number) => {
        if (value <= 3) return "Low Confidence";
        if (value <= 6) return "Moderate Confidence";
        if (value <= 8) return "High Confidence";
        return "Very High Confidence";
    };
    
    return (
        <div>
            <div className="rounded-lg border border-gray-300 p-4">
                <div className="flex items-center justify-between">
                    <div className="mb-3">
                        <label className="block text-sm font-semibold">
                        Confidence Level
                        </label>
                        <p className="text-xs">How confident is the your strategy?</p>
                    </div>

                    <div
                        className={`text-3xl font-bold ${getConfidenceColor(
                        confidence
                        )}`}
                    >
                        {confidence}
                    </div>
                </div>

                <p
                    className={`mt-1 text-sm font-medium ${getConfidenceColor(
                        confidence
                    )}`}
                >
                    {getConfidenceLabel(confidence)}
                </p>

                <input
                    type="range"
                    min={0}
                    max={10}
                    value={confidence}
                    onChange={(e) =>
                        setConfidence(Number(e.target.value))
                    }
                    className="mt-4 w-full cursor-grab active:cursor-grabbing"
                />

                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>Doubt</span>
                    <span>Neutral</span>
                    <span>Conviction</span>
                </div>
            </div>
        </div>
    )
}
