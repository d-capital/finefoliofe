export interface DcfProjection {
    year: number;
    projectedFcf: number;
    presentValue: number;
}

export interface DcfResult {
    beta: number;
    riskFreeRate: number;
    marketRate: number;
    capm: number;
    equity: number | null;
    debt: number | null;
    taxRate: number;
    interestRateOnDebt: number | null;
    averageGrowthRate: number;
    terminalGrowthRate: number;
    enterpriseValue: number;
    netDebt: number | null;
    equityValue: number;
    sharesOutstanding: number;
    fairValue: number;
    marketValueOfDebt: number;
    wacc: number;
    terminalValue: number;
    presentValueOfTerminalValue: number;
    projections: DcfProjection[];
}
