export interface ScreenerResult {
  id: number;
  company: string;
  ticker: string;
  result: string; // undervalued/overvalued
  fairPrice: number;
  pegTtm: number;
  netIncomeGrowthTtm: number;
  netIncomeGrowth3y: number;
  netIncomeGrowth5y: number;
  netIncomeGrowthNext1y: number;
  netIncomeGrowthNext3y: number;
  freeCashFlow: number;
  deFy: number;
  dividendYield: number;
  peTtm: number;
  forwardPe: number;
  price: number;
  type: string;
  marketCap: string;
  sector: string;
  industry: string;
  country: string;
}