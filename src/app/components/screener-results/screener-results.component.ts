import { Component, OnInit, Inject } from '@angular/core';
import { ScreenerResult } from '../../dto/screener/screener-result.model';
import { NgFor, NgIf, DOCUMENT } from '@angular/common';
import { ScreenerService } from '../../services/screener.service';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BrowserStorageService } from '../../services/browser-storage.service';

interface Column {
  short: string;
  full: string;
}


@Component({
  selector: 'app-screener-results',
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './screener-results.component.html',
  styleUrl: './screener-results.component.css'
})

export class ScreenerResultsComponent implements OnInit{

  title = '';
  downloadLabel = '';
  filterLabel = '';
  applyLabel = '';
  filterMinDivLabel = '';
  filterMinDivDefaultValue = '';
  exchangeLabel = '';
  exchangeDefaultValue = '';
  columns: Column[] = [];
  results: ScreenerResult[] = [];
  serverErrors = [];
  loading = true;
  lang:string | null = "en";

   filters = {
     minDividend: 0,
     exchange: 'NYSE',
  };

  constructor(
      private screenerService: ScreenerService,
      private browserStorageService: BrowserStorageService,
      @Inject(DOCUMENT) private document: Document
    ) {}

  ngOnInit(): void {
    const lang = this.browserStorageService.getItem('language');
    this.lang = lang;
    if (lang === 'ru') {
      this.title = "Результаты скрининга";
      this.downloadLabel = "Скачать в CSV";
      this.filterLabel = "Фильтры";
      this.applyLabel = "Применить";
      this.filterMinDivLabel = "Минимальный % доход от дивидендов";
      this.filterMinDivDefaultValue = "0 по умлочанию";
      this.exchangeLabel = "Биржа";
      this.exchangeDefaultValue = "Например, NYSE";
      this.columns = [
        { short: "Тикер", full: "Тикер акции" },
        { short: "Биржа", full: "Биржа, на которой торгуется акция" },
        { short: "Цена", full: "Текущая цена акции" },
        { short: "EPS", full: "Прибыль на акцию (Earnings Per Share)" },
      ];
    } else {
      this.title = "Screener Results";
      this.downloadLabel = "Download CSV";
      this.filterLabel = "Filters";
      this.applyLabel = "Apply";
      this.filterMinDivLabel = "Minimal Dividend Yield (%)";
      this.filterMinDivDefaultValue = "0 by default";
      this.exchangeLabel = "Exchange";
      this.exchangeDefaultValue = "e.g. NYSE";
      this.columns = [
        { short: "Ticker", full: "Stock Ticker" },
        { short: "Exchange", full: "Exchange where the stock is listed" },
        { short: "Price", full: "Current share price" },
        { short: "EPS", full: "Earnings Per Share" },
      ];
    }

    const defaultParams = {
      minDividend: 0,
      exchange: 'NYSE',
    };
    this.loadResults(defaultParams);
  }
  loadResults(params: { minDividend: number | null; exchange: string }): void {
    this.screenerService.getScreenerResults({
      minDividend: params.minDividend ?? 0,
      exchange: params.exchange.trim(),
    })
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

}
