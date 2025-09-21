import { Component, OnInit } from '@angular/core';
import { ScreenerResult } from '../../dto/screener/screener-result.model';
import { NgFor, NgIf } from '@angular/common';
import { ScreenerService } from '../../services/screener.service';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AbbreviateNumberPipe } from '../../custom-pipe/abbreviate-number.pipe';

interface Column {
  short: string;
  full: string;
}


@Component({
  selector: 'app-screener-results',
  imports: [NgFor, FormsModule, NgIf,AbbreviateNumberPipe],
  templateUrl: './screener-results.component.html',
  styleUrl: './screener-results.component.css'
})

export class ScreenerResultsComponent implements OnInit{

  title = '';
  downloadLabel = '';
  filterLabel = '';
  applyLabel = '';
  fitlerPeLabel = '';
  filterPeDefaultValue = ''
  filterMinDivLabel = '';
  filterMinDivDefaultValue = '';
  columns: Column[] = [];
  results: ScreenerResult[] = [];
  serverErrors = [];
  loading = true;
  lang:string | null = "en";

   filters = {
    maxPe: null as number | null,
    minDividend: null as number | null,
  };

  constructor(
      private screenerService: ScreenerService,
    ) {}

  ngOnInit(): void {
    const lang = localStorage.getItem('language');
    this.lang = lang;
    if (lang === 'ru') {
      this.title = "Результаты скрининга";
      this.downloadLabel = "Скачать в CSV";
      this.filterLabel = "Фильтры";
      this.applyLabel = "Применить";
      this.filterMinDivLabel = "Минимальный % доход от дивидендов";
      this.filterMinDivDefaultValue = "0 по умлочанию";
      this.fitlerPeLabel = "Максимальное P/E";
      this.filterPeDefaultValue = "25 по умолчанию";
      this.columns = [
        /*{ short: "#", full: "№ (Порядковый номер)" },*/
        { short: "Компания", full: "Название компании" },
        { short: "Тикер", full: "Тикер акции" },
        { short: "Оценка", full: "Результат — недооценена или переоценена" },
        { short: "Справедл. цена", full: "Справедливая цена акции по модели Питера Линча" },
        { short: "PEG", full: "Коэффициент PEG (Trailing Twelve Months)" },
        /*{ short: "Рост ЧП TTM", full: "Рост чистой прибыли (Trailing Twelve Months)" },
        { short: "Рост ЧП 3Г", full: "Рост чистой прибыли за 3 года" },
        { short: "Рост ЧП 5Л", full: "Рост чистой прибыли за 5 лет" },
        { short: "Прог. ЧП 1Г", full: "Прогноз роста чистой прибыли на 1 следующий год" },
        { short: "Прог. ЧП 3Г", full: "Прогноз роста чистой прибыли на 3 следующих года" },*/
        { short: "FCF", full: "Свободный денежный поток (Free Cash Flow)" },
        { short: "D/E", full: "Коэффициент Debt-to-Equity (за полный год)" },
        { short: "Див. доходн.", full: "Дивидендная доходность (%)" },
        { short: "P/E", full: "Коэффициент P/E (Trailing Twelve Months)" },
        /*{ short: "Fwd P/E", full: "Forward P/E (прогнозируемый)" },*/
        { short: "Цена", full: "Текущая цена акции" },
        { short: "Тип", full: "Тип по классификации Линча" },
        { short: "Капитал.", full: "Рыночная капитализация" },
        { short: "Сектор", full: "Сектор компании" },
        /*{ short: "Индустрия", full: "Индустрия компании" },*/
        /*{ short: "Страна", full: "Страна эмитента" }*/
      ];
    } else {
      this.title = "Screener Results";
      this.downloadLabel = "Download CSV";
      this.filterLabel = "Filters";
      this.applyLabel = "Apply";
      this.filterMinDivLabel = "Minimal Dividend Yield (%)";
      this.filterMinDivDefaultValue = "0 by default";
      this.fitlerPeLabel = "P/E max";
      this.filterPeDefaultValue = "25 by default";
      this.columns = [
        /*{ short: "#", full: "Number" },*/
        { short: "Company", full: "Company Name" },
        { short: "Ticker", full: "Stock Ticker" },
        { short: "Valuation", full: "Result - Undervalued or overvalued" },
        { short: "Fair Price", full: "Fair Price by Lynch Model" },
        { short: "PEG", full: "Price/Earnings to Growth (Trailing Twelve Months)" },
        /*{ short: "NI Gr. TTM", full: "Net Income Growth TTM" },
        { short: "NI Gr. 3Y", full: "Net Income Growth over 3 Years" },
        { short: "NI Gr. 5Y", full: "Net Income Growth over 5 Years" },
        { short: "NI Gr. N1Y", full: "Forecast Net Income Growth Next 1 Year" },
        { short: "NI Gr. N3Y", full: "Forecast Net Income Growth Next 3 Years" },*/
        { short: "FCF", full: "Free Cash Flow" },
        { short: "D/E", full: "Debt-to-Equity (Full Year)" },
        { short: "Div Yld", full: "Dividend Yield (%)" },
        { short: "P/E", full: "Price/Earnings Trailing Twelve Months" },
        /*{ short: "Fwd P/E", full: "Forward Price/Earnings" },*/
        { short: "Price", full: "Current Share Price" },
        { short: "Type", full: "Lynch Stock Type Classification" },
        { short: "Mkt Cap", full: "Market Capitalization" },
        { short: "Sector", full: "Sector" },
        /*{ short: "Industry", full: "Industry" },*/
        /*{ short: "Country", full: "Country" }*/
      ];
    }

    // Demo data (replace with API later)
    const defaultParams = {
      maxPe: 25,
      minDividend: 0
    };
    this.loadResults(defaultParams);
    this.results = [
      {
        id: 1,
        company: "Apple Inc.",
        ticker: "AAPL",
        result: "Undervalued (15%)",
        fairPrice: 200,
        pegTtm: 1.5,
        netIncomeGrowthTtm: 12,
        netIncomeGrowth3y: 14,
        netIncomeGrowth5y: 10,
        netIncomeGrowthNext1y: 11,
        netIncomeGrowthNext3y: 13,
        freeCashFlow: 80000,
        deFy: 0.4,
        dividendYield: 1,
        peTtm: 28,
        forwardPe: 25,
        price: 175,
        type: "Fast Grower",
        marketCap: "2.8T",
        sector: "Technology",
        industry: "Consumer Electronics",
        country: "USA",
        exchange: "NASDAQ"
      }
    ];
  }
  loadResults(params: any = {}): void {
    if(!params.minDividend){
      params.minDividend = 0;
    }
    if (!params.maxPe){
      params.maxPe = 25;
    }
    this.screenerService.getScreenerResults(params).pipe()
      .subscribe(data =>{
          this.results = data;
          this.loading = false;
      },
      err => {
        this.loading = false;
        if (err instanceof HttpErrorResponse) {

          if (err.status === 422) {
            this.serverErrors = err.error.message
          }
        }
      }
    );
  }

  applyFilters(): void {
    this.loading = true;
    this.loadResults(this.filters);
  }

  exportTableToCSV(): void {
    const table = document.getElementById('resultsTable') as HTMLTableElement | null;
    if (!table) return;

    const rows = Array.from(table.querySelectorAll('tr'));
    const csv: string[] = [];

    for (const row of rows) {
      // Берём все <th> и <td> в строке
      const cols = Array.from(row.querySelectorAll('th, td'));
      const rowData = cols.map(col =>
        `"${(col as HTMLElement).innerText.replace(/"/g, '""')}"`
      );
      csv.push(rowData.join(','));
    }

    if (csv.length === 0) return;

    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'screener-results.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  roundAndConvertToPercent(value: number): string {
    return (value*100).toFixed(2);
  }

  round(value: number): string {
    return (value).toFixed(2);
  }
}
