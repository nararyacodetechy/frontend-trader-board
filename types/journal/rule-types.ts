export interface Rule {
    id: string;
    title: string;
    checked: boolean;
    required: boolean;
}
  
export interface RuleCategory {
    id: string;  
    name: string;
    fields: RuleField[];
}

export type RuleFieldType =
  | "checkbox"
  
export interface RuleField {
    id: string;
    label: string;
    type: RuleFieldType;
    required: boolean;
    value?: unknown;
    options?: string[];
    placeholder?: string;
}