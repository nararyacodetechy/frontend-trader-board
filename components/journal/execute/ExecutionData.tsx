"use client";

import { useMemo } from "react";
import {
  ExecutionField,
  ExecutionFieldGroup,
} from "@/types/journal/execute-types";
import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  fields: ExecutionField[];
  onChange: (id: number, value: string) => void;
  columns?: 1 | 2;
  pipSize?: number;
};

const moneyFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const toNumber = (value: string) => {
  const cleaned = String(value).replace(/,/g, "").replace(/[^\d.-]/g, "");
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : NaN;
};

const formatCompactNumber = (value: number) => {
  if (!Number.isFinite(value)) return "";
  const rounded = Math.abs(value) >= 100 ? value.toFixed(0) : value.toFixed(2);
  return Number(rounded).toString();
};

const todayValue = () => new Date().toISOString().slice(0, 10);

const nowValue = () => {
  const d = new Date();
  return d.toTimeString().slice(0, 5);
};

function calculateDerivedValues(
  values: Record<string, string>,
  pipSize: number
): Record<string, string> {
  const result: Record<string, string> = {};

  const riskPercentRaw =
  values.riskPercent === "Custom"
    ? values.riskPercentCustom
    : values.riskPercent;
    
  const startBalance = values.startBalance?.trim() === "" ? NaN : toNumber(values.startBalance);
  const riskPercent = riskPercentRaw?.trim() === "" ? NaN : toNumber(riskPercentRaw);
  const entryPrice = values.entryPrice?.trim() === "" ? NaN : toNumber(values.entryPrice);
  const stopLoss = values.stopLoss?.trim() === "" ? NaN : toNumber(values.stopLoss);
  const takeProfit = values.takeProfit?.trim() === "" ? NaN : toNumber(values.takeProfit);


  const riskAmount = Number.isFinite(startBalance) && Number.isFinite(riskPercent)
    ? (startBalance * riskPercent) / 100
    : NaN;

  const slDistance =
    Number.isFinite(entryPrice) && Number.isFinite(stopLoss)
      ? Math.abs(entryPrice - stopLoss) / pipSize
      : NaN;

  const tpDistance =
    Number.isFinite(entryPrice) && Number.isFinite(takeProfit)
      ? Math.abs(takeProfit - entryPrice) / pipSize
      : NaN;

  const rr =
    Number.isFinite(slDistance) && slDistance > 0 && Number.isFinite(tpDistance)
      ? tpDistance / slDistance
      : NaN;

  const expectedLoss = Number.isFinite(riskAmount) ? riskAmount : NaN;
  const expectedProfit =
    Number.isFinite(riskAmount) && Number.isFinite(rr) ? riskAmount * rr : NaN;

  if (Number.isFinite(riskAmount)) result.riskAmount = `$${moneyFormatter.format(riskAmount)}`;
  if (Number.isFinite(slDistance)) result.slDistance = formatCompactNumber(slDistance);
  if (Number.isFinite(tpDistance)) result.tpDistance = formatCompactNumber(tpDistance);
  if (Number.isFinite(rr)) result.riskReward = `1 : ${formatCompactNumber(rr)}`;
  if (Number.isFinite(expectedProfit)) result.expectedProfit = `$${moneyFormatter.format(expectedProfit)}`;
  if (Number.isFinite(expectedLoss)) result.expectedLoss = `$${moneyFormatter.format(expectedLoss)}`;

  return result;
}

const GROUP_ORDER: ExecutionFieldGroup[] = [
  "order",
  "risk",
  "entry",
  "auto",
  "time",
];

const GROUP_META: Record<
  ExecutionFieldGroup,
  { title: string; subtitle?: string }
> = {
  order: {
    title: "Order",
    subtitle: "Pilih tipe order dengan cepat.",
  },
  risk: {
    title: "Risk Management",
    subtitle: "Isi seperlunya, sisanya dihitung otomatis.",
  },
  entry: {
    title: "Entry Setup",
    subtitle: "Parameter utama trade.",
  },
  auto: {
    title: "Auto Calculated",
    subtitle: "Field ini dihitung otomatis dari input lain.",
  },
  time: {
    title: "Time & Session",
    subtitle: "Waktu eksekusi dan market session.",
  },
  metrics: {
    title: "",
    subtitle: undefined
  }
};

export const ExecutionDataSection = ({
  title,
  subtitle,
  fields,
  onChange,
  columns = 2,
  pipSize = 0.0001,
}: Props) => {
  const valuesByName = useMemo(() => {
    return Object.fromEntries(fields.map((field) => [field.name, field.value]));
  }, [fields]);

  const derivedValues = useMemo(
    () => calculateDerivedValues(valuesByName, pipSize),
    [valuesByName, pipSize]
  );

  const fieldValue = (field: ExecutionField) => {
    if (field.kind === "readonly" && derivedValues[field.name] !== undefined) {
      return derivedValues[field.name];
    }
    return field.value;
  };

  const groupedFields = useMemo(() => {
    const map: Partial<Record<ExecutionFieldGroup, ExecutionField[]>> = {};
    for (const group of GROUP_ORDER) map[group] = [];

    for (const field of fields) {
      if (!map[field.group]) map[field.group] = [];
      map[field.group]!.push(field);
    }

    for (const group of GROUP_ORDER) {
      map[group]!.sort((a, b) => a.order - b.order);
    }

    return map;
  }, [fields]);

  const renderInput = (field: ExecutionField) => {
    const commonClass =
      "h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-blue-500";

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
        </label>

        {field.helper && <p className="text-xs text-gray-500">{field.helper}</p>}

        <div className="relative">
          {field.prefix && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              {field.prefix}
            </span>
          )}

          <input
            value={fieldValue(field)}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={`${commonClass} ${field.prefix ? "pl-8" : ""} ${
              field.suffix ? "pr-14" : ""
            }`}
            type="text"
            inputMode="decimal"
            placeholder={field.placeholder}
          />

          {field.suffix && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              {field.suffix}
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderSelect = (field: ExecutionField) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
      </label>

      {field.helper && <p className="text-xs text-gray-500">{field.helper}</p>}

      <select
        value={fieldValue(field)}
        onChange={(e) => onChange(field.id, e.target.value)}
        className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-blue-500"
      >
        <option value="">Select...</option>
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const renderStepper = (field: ExecutionField) => {
    const current = toNumber(fieldValue(field));
    const safeValue = Number.isFinite(current) ? current : 0;
    const step = field.step ?? 0.01;
  
    const update = (delta: number) => {
      const next = Math.max(field.min ?? 0, safeValue + delta);
      onChange(field.id, Number(next.toFixed(2)).toString());
    };
  
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
        </label>
  
        <div className="flex items-stretch overflow-hidden rounded-lg border border-gray-300 bg-white">
          <button
            type="button"
            onClick={() => update(-step)}
            className="w-12 px-3 py-2 text-lg font-medium text-gray-700 hover:bg-gray-50"
          >
            −
          </button>
  
          <input
            value={fieldValue(field)}
            onChange={(e) => onChange(field.id, e.target.value)}
            className="h-11 flex-1 border-x border-gray-300 px-4 text-center text-sm outline-none"
            inputMode="decimal"
            type="text"
          />
  
          <button
            type="button"
            onClick={() => update(step)}
            className="w-12 px-3 py-2 text-lg font-medium text-gray-700 hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>
    );
  };

  const renderSwitch = (field: ExecutionField) => {
    const checked = fieldValue(field) === "true";

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
        </label>

        <button
          type="button"
          onClick={() => onChange(field.id, checked ? "false" : "true")}
          className={`flex h-11 w-full items-center justify-between rounded-lg border px-4 text-sm transition ${
            checked ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
          }`}
        >
          <span>{checked ? "ON" : "OFF"}</span>
          <span
            className={`h-5 w-10 rounded-full p-0.5 transition ${
              checked ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`block h-4 w-4 rounded-full bg-white transition ${
                checked ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </span>
        </button>
      </div>
    );
  };

  const renderSegmented = (field: ExecutionField) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
      </label>

      <div className={`grid gap-2 ${field.options?.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
        {field.options?.map((option) => {
          const active = fieldValue(field) === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(field.id, option.value)}
              className={`rounded-lg border px-3 py-2 text-sm transition ${
                active
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-white hover:bg-gray-50"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderChips = (field: ExecutionField) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
        </label>
  
        <div className="flex flex-wrap gap-2">
          {field.options?.map((option) => {
            const active = fieldValue(field) === option.value;
  
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(field.id, option.value)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  active
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 bg-white hover:bg-gray-50"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCards = (field: ExecutionField) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
      </label>

      <div className="grid grid-cols-2 gap-3">
        {field.options?.map((option) => {
          const active = fieldValue(field) === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(field.id, option.value)}
              className={`rounded-lg border p-3 text-left transition ${
                active
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="text-xl">{option.emoji ?? "•"}</div>
              <div className="mt-2 text-sm font-semibold">{option.label}</div>
              {option.description && (
                <p className="mt-1 text-xs text-gray-500">
                  {option.description}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderReadonly = (field: ExecutionField) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
      </label>

      <div className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900">
        {fieldValue(field) || "-"}
      </div>

      {field.helper && <p className="text-xs text-gray-500">{field.helper}</p>}
    </div>
  );

  const renderDate = (field: ExecutionField) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
        </label>

        {field.quickAction === "today" && (
          <button
            type="button"
            onClick={() => onChange(field.id, todayValue())}
            className="text-xs font-medium text-blue-600"
          >
            Today
          </button>
        )}
      </div>

      <input
        value={fieldValue(field)}
        onChange={(e) => onChange(field.id, e.target.value)}
        type="date"
        className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-blue-500"
      />
    </div>
  );

  const renderTime = (field: ExecutionField) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
        </label>

        {field.quickAction === "now" && (
          <button
            type="button"
            onClick={() => onChange(field.id, nowValue())}
            className="text-xs font-medium text-blue-600"
          >
            Now
          </button>
        )}
      </div>

      <input
        value={fieldValue(field)}
        onChange={(e) => onChange(field.id, e.target.value)}
        type="time"
        className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-blue-500"
      />
    </div>
  );

  const renderField = (field: ExecutionField) => {
    switch (field.kind) {
      case "segmented":
        return renderSegmented(field);
      case "chips":
        return renderChips(field);
      case "cards":
        return renderCards(field);
      case "switch":
        return renderSwitch(field);
      case "stepper":
        return renderStepper(field);
      case "select":
        return renderSelect(field);
      case "date":
        return renderDate(field);
      case "time":
        return renderTime(field);
      case "readonly":
        return renderReadonly(field);
      case "input":
      default:
        return renderInput(field);
    }
  };

  const renderGroup = (group: ExecutionFieldGroup) => {
    const rawGroupFields = groupedFields[group] ?? [];
    if (!rawGroupFields.length) return null;
  
    const riskMode = valuesByName.riskPercent === "Custom";
  
    const groupFields =
      group === "risk"
        ? rawGroupFields.filter(
            (field) => field.name !== "riskPercentCustom" || riskMode
          )
        : rawGroupFields;
  
    const isRiskGroup = group === "risk";
    const isAutoGroup = group === "auto";
    const isOrderGroup = group === "order";
    const isEntryGroup = group === "entry";
    const isTimeGroup = group === "time";
  
    const shouldSpanFullWidth = (field: ExecutionField) => {
      if (field.kind === "cards") return true;
      if (field.kind === "segmented") return true;
      if (field.name === "riskPercent") return true;
      if (field.name === "riskPercentCustom") return true;
  
      // kalau field time / session memang mau full di mobile & desktop
      if (field.name === "time") return true;
      if (field.name === "session") return true;
  
      return false;
    };
  
    const renderFieldItem = (field: ExecutionField) => (
      <div
        key={field.id}
        className={shouldSpanFullWidth(field) ? "lg:col-span-2" : ""}
      >
        {renderField(field)}
      </div>
    );
  
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900">
            {GROUP_META[group].title}
          </h4>
          {GROUP_META[group].subtitle && (
            <p className="mt-1 text-xs text-gray-500">
              {GROUP_META[group].subtitle}
            </p>
          )}
        </div>
  
        {isRiskGroup ? (
          (() => {
            const bottomFieldNames = ["riskPercent", "riskPercentCustom"];
            const bottomFields = groupFields.filter((field) =>
              bottomFieldNames.includes(field.name)
            );
            const topFields = groupFields.filter(
              (field) => !bottomFieldNames.includes(field.name)
            );
  
            return (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {topFields.map((field) => renderFieldItem(field))}
                </div>
  
                {bottomFields.length > 0 && (
                  <div className="grid grid-cols-1 gap-4">
                    {bottomFields.map((field) => (
                      <div key={field.id}>{renderField(field)}</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()
        ) : isTimeGroup ? (
          (() => {
            const sessionField = groupFields.find(
              (field) => field.name === "session"
            );
        
            const otherFields = groupFields.filter(
              (field) => field.name !== "session"
            );
        
            return (
              <div className="space-y-4">
                {/* Session full width */}
                {sessionField && (
                  <div>
                    {renderField(sessionField)}
                  </div>
                )}
        
                {/* Open Date, Open Time, Timezone */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {otherFields.map((field) => (
                    <div key={field.id}>
                      {renderField(field)}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()
        ) : isEntryGroup ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {groupFields.map((field) => (
              <div key={field.id}>{renderField(field)}</div>
            ))}
          </div>
        ) : isAutoGroup ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {groupFields.map((field) => renderFieldItem(field))}
          </div>
        ) : isOrderGroup ? (
          <div className="grid grid-cols-1 gap-4">
            {groupFields.map((field) => (
              <div key={field.id}>{renderField(field)}</div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {groupFields.map((field) => (
              <div key={field.id}>{renderField(field)}</div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="rounded-lg border border-gray-300 p-4">
      <div className="mb-4">
        <h3 className="text-base font-semibold">{title}</h3>
        {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
      </div>

      <div className="space-y-4">
        {GROUP_ORDER.map((group) => (
          <React.Fragment key={group}>
            {renderGroup(group)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};