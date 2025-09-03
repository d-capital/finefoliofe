export interface ValuationResult {
  fairPrice: number;
  formula: string;
  explanation: string;
  resultPercent: number;
  resultLabel: 'Undervalued' | 'Overvalued';
  netProfitHistory: { year: string; value: number }[];
  avgGrowth: {
    ttm: number;
    threeYears: number;
    fiveYears: number;
  };
}