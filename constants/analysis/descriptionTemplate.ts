// data/journalTemplates.ts

import { DescriptionTemplate } from "@/types/journal/template-analysis";

export const descriptionTemplates: DescriptionTemplate[] = [
  {
    id: "market-context",
    label: "Market Context",
    description: "Describe current market conditions",
    content: [
      {
        text: "Market Context",
        bold: true,
      },
      {
        text: "\nDescribe the overall market condition.\n\n",
      },
    ],
  },

  {
    id: "entry-reason",
    label: "Entry Reason",
    description: "Why did you enter this trade?",
    content: [
      {
        text: "Entry Reason",
        bold: true,
      },
      {
        text:
          "\n• Liquidity\n• Structure\n• Confirmation\n\n",
      },
    ],
  },

  {
    id: "execution",
    label: "Execution",
    description: "Trade management and execution",
    content: [
      {
        text: "Execution",
        bold: true,
      },
      {
        text:
          "\nExplain how the trade was executed.\n\n",
      },
    ],
  },

  {
    id: "outcome",
    label: "Outcome",
    description: "Trade result",
    content: [
      {
        text: "Outcome",
        bold: true,
        italic: true,
      },
      {
        text:
          "\nDescribe the final result.\n\n",
      },
    ],
  },

  {
    id: "review",
    label: "Post Trade Review",
    description: "Lessons learned",
    content: [
      {
        text: "Post Trade Review",
        bold: true,
      },
      {
        text:
          "\nWhat went well and what can be improved?\n\n",
      },
    ],
  },

  {
    id: "full-journal",
    label: "Full Journal",
    description:
      "Complete journal structure",
    content: [
      {
        text: "Market Context",
        bold: true,
      },
      {
        text:
          "\nDescribe current market conditions.\n\n",
      },

      {
        text: "Entry Reason",
        bold: true,
      },
      {
        text:
          "\nWhy did you take this trade?\n\n",
      },

      {
        text: "Execution",
        bold: true,
      },
      {
        text:
          "\nHow was the trade executed?\n\n",
      },

      {
        text: "Outcome",
        bold: true,
        italic: true,
      },
      {
        text:
          "\nWhat was the result?\n\n",
      },

      {
        text: "Post Trade Review",
        bold: true,
      },
      {
        text:
          "\nLessons learned from this trade.\n\n",
      },
    ],
  },
];