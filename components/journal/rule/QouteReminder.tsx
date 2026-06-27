import { reminderGroups } from "@/data/journal/rule/reminderRule";
import { useEffect, useState } from "react";

export const QouteReminder = () => {
    const allReminders = reminderGroups.flatMap((group) =>
        group.items.map((item) => ({
          category: group.title,
          text: item,
        }))
    );

    const [currentReminder, setCurrentReminder] = useState(0);
  
    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentReminder((prev) =>
            prev === allReminders.length - 1 ? 0 : prev + 1
        );
        }, 4000);
    
        return () => clearInterval(interval);
    }, [allReminders.length]);
    
    return (
        <div>
            <div className="mt-6 rounded-xl bg-zinc-950 p-6 text-white shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                        Pre Trade Reminder
                    </p>

                    <h3 className="mt-1 text-sm font-medium text-zinc-300">
                        {allReminders[currentReminder].category}
                    </h3>
                    </div>

                    <div className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400">
                    {currentReminder + 1} / {allReminders.length}
                    </div>
                </div>

                <div className="mt-6">
                    <blockquote className="text-3xl font-semibold leading-tight">
                    "{allReminders[currentReminder].text}"
                    </blockquote>
                </div>

                <div className="mt-6 h-px bg-zinc-800" />

                <p className="mt-4 text-xs text-zinc-500">
                    Professional traders protect capital first, profits second.
                </p>
                </div>
        </div>
    )
}
