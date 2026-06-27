import React from "react";

export type ExecutionField = {
  id: number;
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
};

type Props = {
  title: string;
  subtitle?: string;
  fields: ExecutionField[];
  onChange: (id: number, value: string) => void;
  columns?: 1 | 2;
};

export const ExecutionDataSection = ({
  title,
  subtitle,
  fields,
  onChange,
  columns = 2,
}: Props) => {
  return (
    <div className="rounded-lg border border-gray-300 p-4">
      <div className="mb-3">
        <h3 className="font-semibold">{title}</h3>
        {subtitle && <p className="text-xs">{subtitle}</p>}
      </div>

      <div className={`grid gap-4 ${columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
        {fields.map((field) => (
          <div key={field.id}>
            <label className="block text-sm italic">{field.label}</label>

            <input
              value={field.value}
              onChange={(e) => onChange(field.id, e.target.value)}
              className="h-12 w-full rounded-lg border border-gray-300 px-4 text-sm"
              type={field.type ?? "text"}
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  );
};