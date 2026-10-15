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
  openLabel = '';
  filterLabel = '';
  applyLabel = '';
  filterMinDivLabel = '';
  filterMinDivDefaultValue = '0';
  filterMinEpsLabel = '';
  filterMinEpsDefaultValue = '15';
  exchangeLabel = '';
  exchangeDefaultValue = '';
  screenerDescription = '';
  columns: Column[] = [];
  results: ScreenerResult[] = [];
  serverErrors = [];
  loading = true;
  lang:string | null = "en";

   filters = {
     minDividend: 0,
     minEps: 15,
     exchange: '',
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
      this.title = "Скриннер акций с ростом чистой прибыли";
      this.downloadLabel = "Скачать в CSV";
      this.openLabel = "Открыть страницу акции в новой вкладке";
      this.filterLabel = "Фильтры";
      this.applyLabel = "Применить";
      this.filterMinDivLabel = "Минимальный % доход от дивидендов";
      this.filterMinDivDefaultValue = "0 по умлочанию";
      this.filterMinEpsLabel = "Минимальная прибыль на акцию (EPS)";
      this.filterMinEpsDefaultValue = "15 по умолчанию";
      this.exchangeLabel = "Биржа";
      this.exchangeDefaultValue = "Выберите биржу";
      this.screenerDescription = "Изучите акции компаний, чистая прибыль которых росла последние 5 лет. Вы можете менять параметры дивидендного дохода, минимальной прибыли на акцию, выбирать биржу.";
      this.columns = [
        { short: "Тикер", full: "Тикер акции" },
        { short: "", full: "" },
        { short: "Биржа", full: "Биржа, на которой торгуется акция" },
        { short: "Цена", full: "Текущая цена акции" },
        { short: "EPS", full: "Прибыль на акцию (Earnings Per Share)" },
      ];
    } else if (lang === 'es') {
      this.title = "Buscador de acciones con crecimiento de ingresos netos";
      this.downloadLabel = "Descargar CSV";
      this.openLabel = "Abrir la página de la acción en una pestaña nueva";
      this.filterLabel = "Filtros";
      this.applyLabel = "Aplicar";
      this.filterMinDivLabel = "Rendimiento mínimo de dividendos (%)";
      this.filterMinDivDefaultValue = "0 por defecto";
      this.filterMinEpsLabel = "Ganancias mínimas por acción (EPS)";
      this.filterMinEpsDefaultValue = "15 por defecto";
      this.exchangeLabel = "Bolsa";
      this.exchangeDefaultValue = "Selecciona una bolsa";
      this.screenerDescription = "Explora acciones de empresas con crecimiento de ingresos netos en los últimos 5 años. Puedes filtrar por rendimiento de dividendos y ganancias por acción, además de elegir la bolsa.";
      this.columns = [
        { short: "Ticker", full: "Ticker de la acción" },
        { short: "", full: "" },
        { short: "Bolsa", full: "Bolsa en la que se negocia la acción" },
        { short: "Precio", full: "Precio actual de la acción" },
        { short: "EPS", full: "Ganancias por acción (Earnings Per Share)" },
      ];
    } else {
      this.title = "Stock with Net Income Growth Screener";
      this.downloadLabel = "Download CSV";
      this.openLabel = "Open stock page in a new tab";
      this.filterLabel = "Filters";
      this.applyLabel = "Apply";
      this.filterMinDivLabel = "Minimal Dividend Yield (%)";
      this.filterMinDivDefaultValue = "0 by default";
      this.filterMinEpsLabel = "Minimum Earnings Per Share (EPS)";
      this.filterMinEpsDefaultValue = "15 by default";
      this.exchangeLabel = "Exchange";
      this.exchangeDefaultValue = "Select an exchange";
      this.screenerDescription = "Explore stocks of companies with net income growth in past 5 years. You can filter them by Dividends Yield and Earinings per Share, as well as select the exchange.";
      this.columns = [
        { short: "Ticker", full: "Stock Ticker" },
        { short: "", full: "" },
        { short: "Exchange", full: "Exchange where the stock is listed" },
        { short: "Price", full: "Current share price" },
        { short: "EPS", full: "Earnings Per Share" },
      ];
    }

    const defaultParams = {
      minDividend: 0,
      minEps: 15,
      exchange: '',
    };
    this.loadResults(defaultParams);
  }
  loadResults(params: { minDividend: number | null; minEps: number | null; exchange: string }): void {
    this.screenerService.getScreenerResults({
      minDividend: params.minDividend ?? 0,
      minEps: params.minEps ?? 0,
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

  getStockUrl(result: ScreenerResult): string {
    const localePrefix = this.lang && this.lang !== 'en' ? `/${this.lang}` : '';
    const exchangeTicker = `${result.exchange.toLowerCase()}-${result.ticker.toLowerCase()}`;
    return `${localePrefix}/stocks/${exchangeTicker}/peter-lynch-fair-value-calculator`;
  }

  exportTableToCSV(): void {
    const table = document.getElementById('resultsTable') as HTMLTableElement | null;
    if (!table) return;

    const rows = Array.from(table.querySelectorAll('tr'));
    const csv: string[] = [];

    for (const row of rows) {
      // Берём все <th> и <td> в строке
      const cols = Array.from(row.querySelectorAll('th, td'))
        .filter(col => !col.hasAttribute('data-export-ignore'));
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
