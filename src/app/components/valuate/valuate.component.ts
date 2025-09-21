import { CommonModule, NgFor } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockInfo } from '../../dto/valuation/stock-info.model';
import { ValuationResult } from '../../dto/valuation/valuation.model';
import { ValuationService } from '../../services/valuation.service';
import { ErrorStateComponent } from '../error-state/error-state.component';
import { AbbreviateNumberPipe } from '../../custom-pipe/abbreviate-number.pipe';

@Component({
  selector: 'app-valuate',
  imports: [NgFor,CommonModule, ErrorStateComponent, AbbreviateNumberPipe],
  templateUrl: './valuate.component.html',
  styleUrl: './valuate.component.css'
})
export class ValuateComponent implements OnInit{
  constructor(
    private ValuationServiceApi: ValuationService,
    private route: ActivatedRoute
  ){}
  stockInfo!: StockInfo;
  valuation!: ValuationResult;
  loading: boolean = true;
  error: boolean = false;
  serverErrors = [];
  ticker: string = 'AAPL';
  exchange: string = 'NYSE'
  
  //Localization
  loadingLabel:string = "Loading valuation data...";
  loadingLabelRu:string = "Загружаю данные для оценки...";
  loadingLabelEn:string = "Loading valuation data...";

  exchangeLabel:string = "Exchange: ";
  exchangeLabelRu:string = "Биржа: ";
  exchangeLabelEn:string = "Exchange: ";

  countryLabel: string = "Country: ";
  countryLabelRu: string = "Страна: ";
  countryLabelEn: string = "Country: ";

  stockInformationLabel:string = "Stock Information";
  stockInformationLabelRu:string = "Информация об акции:";
  stockInformationLabelEn:string = "Stock Information";

  priceLabel:string = "Price:";
  priceLabelRu:string = "Цена:";
  priceLabelEn:string = "Price:";

  marketCapLabel:string = "Market Cap:";
  marketCapLabelRu:string = "Рыночная капитализация:";
  marketCapLabelEn:string = "Market Cap:";

  sectorLabel: string = "Sector:";
  sectorLabelRu: string = "Сектор:";
  sectorLabelEn: string = "Sector:";

  industryLabel:string = "Industry:";
  industryLabelRu:string = "Индустрия:";
  industryLabelEn:string = "Industry:";

  epsTtmLabel:string = "EPS (TTM):";
  epsTtmLabelRu:string = "EPS (TTM):";
  epsTtmLabelEn:string = "EPS (TTM):";

  peTtmLabel:string = "P/E (TTM):";
  peTtmLabelRu:string = "P/E (TTM):";
  peTtmLabelEn:string = "P/E (TTM):";

  dividendsYieldLabel:string = "Dividend Yield:";
  dividendsYieldLabelRu:string = "Дивидендная доходность:";
  dividendsYieldLabelEn:string = "Dividend Yield:";

  //valuation card
  valuationResultsLabel:string = "Valuation Result";
  valuationResultsLabelRu:string = "Резултат Оценки";
  valuationResultsLabelEn:string = "Valuation Result";

  fairPriceLabel:string = "Fair Price (Lynch Model):";
  fairPriceLabelRu:string = "Справедливая Цена (по модели Линча):";
  fairPriceLabelEn:string = "Fair Price (Lynch Model):";

  resultLabel:string = "Result:";
  resultLabelRu:string = "Результат:";
  resultLabelEn:string = "Result:";

  formulaLabel:string = "Formula:";
  formulaLabelRu:string = "Формула:";
  formulaLabelEn:string = "Formula:";

  formulaExplanationLabel:string = "EPS x 5 Year Average Net Income Growth Rate";
  formulaExplanationLabelRu:string = "EPS x Средний годовой рост Чистой Прибыли за 5 лет";
  formulaExplanationLabelEn:string = "EPS x 5 Year Average Net Income Growth Rate";

  //historicalProfit
  netProfitGrowthLabel:string = "Net Income";
  netProfitGrowthLabelRu:string = "Чистая Прибыль";
  netProfitGrowthLabelEn:string = "Net Income";

  averageIncomeGrowthLabel: string = "Average Growth:";
  averageIncomeGrowthLabelRu: string = "Средний Показатели Роста Чистой Прибыли";
  averageIncomeGrowthLabelEn: string = "Average Growth:";

  averageIncomeGrowthTtm:string = "TTM: ";
  averageIncomeGrowthTtmRu:string = "Последние 12 месяцев: ";
  averageIncomeGrowthTtmEn:string = "TTM: ";

  averageThreeYearsGrowth:string = "3 Years: ";
  averageThreeYearsGrowthRu:string = "3 года: ";
  averageThreeYearsGrowthEn:string = "3 Years: ";

  averageFiveYearsGrowth:string = "5 Years: ";
  averageFiveYearsGrowthRu:string = "5 лет: ";
  averageFiveYearsGrowthEn:string = "5 Years: ";

  //lynch explanation
  aboutLynchFormulaLabel:string = "About Lynch Formula";
  aboutLynchFormulaLabelRu:string = "О формуле Питера Линча";
  aboutLynchFormulaLabelEn:string = "About Lynch Formula";

  aboutLynchFormulaText:string = "The Lynch model helps estimate a stock's fair price based on earnings and growth expectations. It is often used by value investors to determine whether a stock is undervalued or overvalued.";
  aboutLynchFormulaTextRu:string = "Модель Линча помогает оценить справедливую цену акций на основе ожиданий прибыли и роста. Она часто используется стоимостными инвесторами для определения недооценённости или переоценённости акций.";
  aboutLynchFormulaTextEn:string = "The Lynch model helps estimate a stock's fair price based on earnings and growth expectations. It is often used by value investors to determine whether a stock is undervalued or overvalued.";

  undervaluedLabel:string = "Undervalued";
  undervaluedLabelRu:string = "Недооценена";
  undervaluedLabelEn:string = "Undervalued";

  overvaluedLabel:string = "Overvalued";
  overvaluedLabelRu:string = "Переоценена";
  overvaluedLabelEn:string = "Overvalued";

  ngOnInit(): void {
    var language = localStorage.getItem('language');
    if(language == 'ru'){
      this.loadingLabel = this.loadingLabelRu;
      this.exchangeLabel = this.exchangeLabelRu;
      this.countryLabel = this.countryLabelRu;
      this.stockInformationLabel = this.stockInformationLabelRu;
      this.priceLabel = this.priceLabelRu;
      this.marketCapLabel = this.marketCapLabelRu;
      this.sectorLabel = this.sectorLabelRu;
      this.industryLabel = this.industryLabelRu;
      this.epsTtmLabel = this.epsTtmLabelRu;
      this.peTtmLabel = this.peTtmLabelRu;
      this.dividendsYieldLabel = this.dividendsYieldLabelRu;

      //valuation card
      this.valuationResultsLabel = this.valuationResultsLabelRu;
      this.fairPriceLabel = this.fairPriceLabelRu;
      this.resultLabel = this.resultLabelRu;
      this.formulaLabel = this.formulaLabelRu;
      this.formulaExplanationLabel = this.formulaExplanationLabelRu;

      //historicalProfit
      this.netProfitGrowthLabel = this.netProfitGrowthLabelRu;
      this.averageIncomeGrowthLabel = this.averageIncomeGrowthLabelRu;
      this.averageIncomeGrowthTtm = this.averageIncomeGrowthTtmRu;
      this.averageThreeYearsGrowth = this.averageThreeYearsGrowthRu;
      this.averageFiveYearsGrowth = this.averageFiveYearsGrowthRu;

      //lynch explanation
      this.aboutLynchFormulaLabel = this.aboutLynchFormulaLabelRu;
      this.aboutLynchFormulaText = this.aboutLynchFormulaTextRu;

      this.undervaluedLabel = this.undervaluedLabelRu;
      this.overvaluedLabel = this.overvaluedLabelRu;
    }
    else{
      this.loadingLabel = this.loadingLabelEn;
      this.exchangeLabel = this.exchangeLabelEn;
      this.countryLabel = this.countryLabelEn;
      this.stockInformationLabel = this.stockInformationLabelEn;
      this.priceLabel = this.priceLabelEn;
      this.marketCapLabel = this.marketCapLabelEn;
      this.sectorLabel = this.sectorLabelEn;
      this.industryLabel = this.industryLabelEn;
      this.epsTtmLabel = this.epsTtmLabelEn;
      this.peTtmLabel = this.peTtmLabelEn;
      this.dividendsYieldLabel = this.dividendsYieldLabelEn;

      //valuation card
      this.valuationResultsLabel = this.valuationResultsLabelEn;
      this.fairPriceLabel = this.fairPriceLabelEn;
      this.resultLabel = this.resultLabelEn;
      this.formulaLabel = this.formulaLabelEn;
      this.formulaExplanationLabel = this.formulaExplanationLabelEn;

      //historicalProfit
      this.netProfitGrowthLabel = this.netProfitGrowthLabelEn;
      this.averageIncomeGrowthLabel = this.averageIncomeGrowthLabelEn;
      this.averageIncomeGrowthTtm = this.averageIncomeGrowthTtmEn;
      this.averageThreeYearsGrowth = this.averageThreeYearsGrowthEn;
      this.averageFiveYearsGrowth = this.averageFiveYearsGrowthEn;

      //lynch explanation
      this.aboutLynchFormulaLabel = this.aboutLynchFormulaLabelEn;
      this.aboutLynchFormulaText = this.aboutLynchFormulaTextEn;

      this.undervaluedLabel = this.undervaluedLabelEn;
      this.overvaluedLabel = this.overvaluedLabelEn;

    }

    const tickerCode = this.route.snapshot.paramMap.get('ticker');
    const exchangeCode = this.route.snapshot.paramMap.get('exchange');
    this.ticker = tickerCode ? tickerCode : 'AAPL';
    this.exchange = exchangeCode ? exchangeCode : 'NYSE';
    this.ValuationServiceApi.getValuation(this.ticker, this.exchange).pipe().subscribe(data => {
      this.stockInfo = data['stockInfo'];
      this.valuation = data['valuation'];
      this.loading = false;
    },
      err => {
        this.error = true;
        this.loading = false;
        if (err instanceof HttpErrorResponse) {
          
          if (err.status === 422) {
            this.serverErrors = err.error.message
          }
        }
      }
    )
  }
  round(value: number): string {
    return (value).toFixed(2);
  }
}
