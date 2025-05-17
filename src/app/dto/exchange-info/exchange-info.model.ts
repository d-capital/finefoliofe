export class ExchangeInfo {
  rate: number = 0;
  first_currency_short_code: string = '';
  first_currency_interest_rate: number = 0;
  first_currency_inflation_rate: number = 0;
  first_currency_unemployment_rate: number = 0;
  first_currency_gdp_growth_rate: number = 0;
  second_currency_short_code: string = '';
  second_currency_interest_rate: number = 0;
  second_currency_inflation_rate: number = 0;
  second_currency_unemployment_rate: number = 0;
  second_currency_gdp_growth_rate: number = 0;
  forecast_regression: number = 0;
  forecast_ppp: number = 0;
  recommendation: string = '';
}