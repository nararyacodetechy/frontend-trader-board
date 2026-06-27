import { emotions } from "@/data/journal/execute/EmotionData"
import { useState } from "react";

export const EmotionLevel = () => {
    const [emotion, setEmotion] =
        useState("Calm");
        
    return (
        <div>
            <div className="rounded-lg border border-gray-300 p-4">
                <div className="mb-3">
                    <label className="block text-sm font-semibold">
                    Emotion Before Entry
                    </label>
                    <p className="text-xs">Your emotions reflect the end result</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {emotions.map((item) => (
                    <button
                        key={item.value}
                        type="button"
                        onClick={() =>
                        setEmotion(item.value)
                        }
                        className={`rounded-lg border border-gray-300 p-3 transition-all hover:scale-[1.02]
                        ${
                            emotion === item.value
                            ? "bg-blue-100"
                            : ""
                        }
                        `}
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

                {emotion && (
                    <div className="mt-4 rounded-md bg-blue-50 p-3">
                    <p className="text-sm text-center">
                        {
                        emotions.find(
                            (e) => e.value === emotion
                        )?.description
                        }
                    </p>
                    </div>
                )}
            </div>
        </div>
    )
}
