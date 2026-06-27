import { EntryConfirmationItem } from "@/types/journal/execute-types";

export const defaultEntryConfirmations: EntryConfirmationItem[] = [
  {
    id: 1,
    title: "Bullish candle pada TF 15M",
    checked: true,
    note: "",
    expanded: false,
  },
  {
    id: 2,
    title: "Breakout terjadi dengan impulsive candle",
    checked: true,
    note: "",
    expanded: false,
  },
  {
    id: 3,
    title: "Volume lebih tinggi dari rata-rata",
    checked: false,
    note: "",
    expanded: false,
  },
  {
    id: 4,
    title: "Retest area berhasil terjadi",
    checked: false,
    note: "",
    expanded: false,
  },
];