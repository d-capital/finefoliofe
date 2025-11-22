export interface StockInfo {
  name: string;
  ticker: string;
  exchange: string;
  price: number;
  country: string;
  capitalization: string;
  sector: string;
  industry: string;
  epsTtm: number;
  peTtm: number;
  dividendYield: number;
  freeCashFlow: number;
  debtToEquity: number;
}