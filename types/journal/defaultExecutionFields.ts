// /types/journal/execute-types.ts
export type ExecutionFieldKind =
  | "segmented"
  | "chips"
  | "cards"
  | "switch"
  | "stepper"
  | "input"
  | "select"
  | "date"
  | "time"
  | "readonly";

export type ExecutionOption = {
  label: string;
  value: string;
  emoji?: string;
  description?: string;
};

export type ExecutionFieldGroup =
  | "order"
  | "risk"
  | "entry"
  | "metrics"
  | "time"
  | "auto";

export type ExecutionField = {
  id: number;
  name: string;
  label: string;
  value: string;
  kind: ExecutionFieldKind;
  group: ExecutionFieldGroup;
  order: number;
  placeholder?: string;
  options?: ExecutionOption[];
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  helper?: string;
  quickAction?: "now" | "today";
};