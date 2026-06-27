import { RuleCategory } from "@/types/journal/rule-types";

export const defaultRuleCategories: RuleCategory[] = [
  {
    id: "market-structure",
  
    name: "Market Structure",
  
    fields: [
      {
        id: "ms-1",
        type: "checkbox",
        label: "Trend HTF sudah jelas",
        required: true,
      },
  
      {
        id: "ms-2",
        type: "checkbox",
        label: "Tidak melawan trend utama",
        required: true,
      },
  
      {
        id: "ms-3",
        type: "checkbox",
        label: "Structure mendukung bias",
        required: true,
      },
    ],
  },
  {
    id: "risk",
  
    name: "Risk Management",
  
    fields: [
      {
        id: "risk-percent",
        type: "checkbox",
        label: "Risk %",
        required: true,
      },
  
      {
        id: "rr",
        type: "checkbox",
        label: "Risk Reward",
        required: true,
      },
  
      {
        id: "risk-confirm",
        type: "checkbox",
        label: "Lot size sudah dihitung",
        required: true,
      },
    ],
  },
  {
    id: "psychology",
  
    name: "Psychology",
  
    fields: [
      {
        id: "emotion",
        type: "checkbox",
        label: "Kondisi Emosi",
  
        options: [
          "Tenang",
          "Sedikit Stress",
          "Stress",
          "Marah",
        ],
  
        required: true,
      },
  
      {
        id: "note",
        type: "checkbox",
        label: "Catatan Mental",

        required: false,
      },
    ],
  },

];