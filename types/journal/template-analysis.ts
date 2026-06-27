export type AnalysisTemplate = {
  id: number;
  pair?: string;
  tradeName?: string;
  timeframe: string;
  analysisPurpose: string;
  strategyIds: string[];
  image: string;
  description: string;
  tags: string[];
};

export type DescriptionTemplateContent = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

export type DescriptionTemplate = {
  id: string;
  label: string;
  description?: string;
  content: DescriptionTemplateContent[];
};