import { defaultExecutionFields } from '@/data/journal/execute/ExecutionData';
import { useState } from 'react';

export const ExecutionData = () => {
    const [executionFields, setExecutionFields] =
        useState(defaultExecutionFields);

    const updateExecutionField = (
        id: number,
        value: string
    ) => {
        setExecutionFields((prev) =>
        prev.map((field) =>
            field.id === id
            ? {
                ...field,
                value,
                }
            : field
        )
        );
    };
      
    return (
        <div>
            <div className="rounded-lg border border-gray-300 p-4">
                <div className="mb-3">
                    <h3 className="font-semibold">
                    Execution Data
                    </h3>
                    <p className="text-xs">
                    Fill execution data truly or clearly
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {executionFields.map((field) => (
                        <div key={field.id}>
                            <label className="block text-sm italic">
                                {field.label}
                            </label>

                            <input
                                value={field.value}
                                onChange={(e) =>
                                    updateExecutionField(
                                    field.id,
                                    e.target.value
                                    )
                                }
                                className="h-12 w-full text-sm rounded-lg border border-gray-300 px-4"
                                type="text"
                            />
                        </div>
                    ))}
                </div>
            </div> 
        </div>
    )
}
