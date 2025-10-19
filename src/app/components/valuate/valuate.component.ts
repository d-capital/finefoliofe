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
  stockInformationLabelRu:string = "О компании";
  stockInformationLabelEn:string = "Stock Information";

  priceLabel:string = "Price:";
  priceLabelRu:string = "Цена:";
  priceLabelEn:string = "Price:";

  marketCapLabel:string = "Market Cap";
  marketCapLabelRu:string = "Рыночная капитализация";
  marketCapLabelEn:string = "Market Cap";

  sectorLabel: string = "Sector";
  sectorLabelRu: string = "Сектор";
  sectorLabelEn: string = "Sector:";

  industryLabel:string = "Industry";
  industryLabelRu:string = "Индустрия";
  industryLabelEn:string = "Industry";

  epsTtmLabel:string = "EPS (TTM):";
  epsTtmLabelRu:string = "Базовая прибыль на акцию (EPS TTM)";
  epsTtmLabelEn:string = "Basic earnings per share (EPS TTM)";

  epsTtmLabelCompanyInfo:string = "EPS (TTM)";

  peTtmLabel:string = "P/E (TTM)";
  peTtmLabelRu:string = "P/E (TTM)";
  peTtmLabelEn:string = "P/E (TTM)";

  dividendsYieldLabel:string = "Dividend Yield:";
  dividendsYieldLabelRu:string = "Дивидендная доходность:";
  dividendsYieldLabelEn:string = "Dividend Yield:";

  //valuation card
  valuationResultsLabel:string = "Valuation Result";
  valuationResultsLabelRu:string = "Резултат Оценки";
  valuationResultsLabelEn:string = "Valuation Result";

  valuationOverviewLabel: string = "Overview of Valuation";
  valuationOverviewLabelRu: string = "Обзор Оценки";
  valuationOverviewLabelEn: string = "Overview of Valuation";

  downsidePotentialLabel:string = "Downside potential";
  downsidePotentialLabelRu:string = "Потенциал снижения";
  downsidePotentialLabelEn:string = "Downside potential";

  upsidePotentialLabel:string = "Upside potential";
  upsidePotentialLabelRu:string = "Потенциал роста";
  upsidePotentialLabelEn:string = "Upside potential";

  fairPriceLabel:string = "Fair Price";
  fairPriceLabelRu:string = "Справедливая Цена";
  fairPriceLabelEn:string = "Fair Price";

  resultLabel:string = "Result:";
  resultLabelRu:string = "Результат:";
  resultLabelEn:string = "Result:";

  formulaLabel:string = "Formula";
  formulaLabelRu:string = "Формула";
  formulaLabelEn:string = "Formula";

  formulaExplanationLabel:string = "EPS x 5 Year Average Net Income Growth Rate";
  formulaExplanationLabelRu:string = "Темп роста чистой прибыли за 5 лет (Net Income Growth Rate 5 years) * Базовая прибыль на акцию за последние 12 месяцев (EPS TTM, Earnings per share Trailing Twelve Months) * PEG (PE TTM / Темп роста чистой прибыли за 5 лет) = Справедливая стоимость по формуле Питера Линча";
  formulaExplanationLabelEn:string = "Net Income Growth Rate (5 years) * Basic Earnings per Share (EPS TTM, Earnings per share Trailing Twelve Months)  * PEG (PE TTM / Net Income Growth Rate (5 years)) = Fair Value (FV)";

  //historicalProfit
  netProfitGrowthLabel:string = "Net Income";
  netProfitGrowthLabelRu:string = "Темп роста чистой прибыли (Net Income Growth Rate)";
  netProfitGrowthLabelEn:string = "Net Income Growth Rate";

  averageIncomeGrowthLabel: string = "Average Growth:";
  averageIncomeGrowthLabelRu: string = "Средний Показатели Роста Чистой Прибыли";
  averageIncomeGrowthLabelEn: string = "Average Growth:";

  averageIncomeGrowthTtm:string = "TTM: ";
  averageIncomeGrowthTtmRu:string = "темп роста чистой прибыли (Net Income) за 1 год";
  averageIncomeGrowthTtmEn:string = "trailing 12 month Net Income growth rate (TTM)";

  averageThreeYearsGrowth:string = "3 Years: ";
  averageThreeYearsGrowthRu:string = "темп роста чистой прибыли (Net Income) за 3 года";
  averageThreeYearsGrowthEn:string = "3 years Net Income growth rate";

  averageFiveYearsGrowth:string = "5 Years: ";
  averageFiveYearsGrowthRu:string = "темп роста чистой прибыли (Net Income) за 5 лет";
  averageFiveYearsGrowthEn:string = "5 years Net Income growth rate";

  //lynch explanation
  aboutLynchFormulaLabel:string = "About Lynch Formula";
  aboutLynchFormulaLabelRu:string = "Формула Питера Линча";
  aboutLynchFormulaLabelEn:string = "About Lynch Formula";

  aboutLynchFormulaText:string = "The Lynch model helps estimate a stock's fair price based on earnings and growth expectations. It is often used by value investors to determine whether a stock is undervalued or overvalued.";
  aboutLynchFormulaTextRu:string = "Мы считаем справедливую стоимость акции по следующей версии формулы Питера Линча.<br>Справедливая стоимость акции по Питеру Линчу = Темп роста прибыли (Earnings Growth Rate) * Базовая прибыль на акцию (EPS, Earnings per share) * Цена акции / прибыль на акцию (PEG).<br>Темп роста прибыли (Earnings Growth Rate) - это рост показателя чистая прибыль (Net Income) за последние 5 лет.<br>Базовая прибыль на акцию (EPS, Earnings per share) в нашей версии формулы - это базовая прибыль на акцию за последние 12 месяцев (EPS TTM, Earnings per share Trailing Twelve Months).<br>Цена акции / прибыль на акцию (PEG, Price / Earnings to Growth Ratio) - равна 1 для упрощения расчета";
  aboutLynchFormulaTextEn:string = "We calculate the fair value of a share using the following version of Peter Lynch's formula.<br>Fair value of a share according to Peter Lynch = Earnings Growth Rate * Basic Earnings per Share (EPS, Earnings per share) * Share Price / Earnings per Share (PEG).<br>Earnings Growth Rate is the growth of net income over the past 5 years.<br>Basic Earnings per Share (EPS, Earnings per share) in our version of the formula is basic earnings per share over the past 12 months (EPS TTM, Earnings per share Trailing Twelve Months).<br>Share Price / Earnings per Share (PEG, Price / Earnings to Growth Ratio) - equal to 1 to simplify the calculation";

  undervaluedLabel:string = "Undervalued";
  undervaluedLabelRu:string = "Недооценена";
  undervaluedLabelEn:string = "Undervalued";

  overvaluedLabel:string = "Overvalued";
  overvaluedLabelRu:string = "Переоценена";
  overvaluedLabelEn:string = "Overvalued";

  overvaluedExplanation: string = "";
  undervaluedExplanation: string = "";

  fairPriceExplanation: string = "";
  howFairPriceWasCalulated: string = "";

  growthRateCalcExplanation: string = "Темпы роста чистой прибыли (Net Income) за 1, 3, 5 лет";
  growthRateCalcExplanationRu: string = "Темпы роста чистой прибыли (Net Income) за 1, 3, 5 лет";
  growthRateCalcExplanationEn: string = "Net Income growth rate for 1, 3, 5 last years";

  metricLabel: string = "Metric";
  metricLabelRu: string = "Показатель";
  metricLabelEn: string = "Metric";

  netProfitLabel: string = "Net Profit";
  netProfitLabelRu: string = "Чистая прибыль";
  netProfitLabelEn: string = "Net Profit";

  
  growthLabel: string = "Growth YoY (%)";
  growthLabelRu: string = "Рост год к году";
  growthLabelEn: string = "Growth YoY (%)";

  epsTtmExplanation: string = "";

  pegLabel:string = "PEG";

  mainStockData:string = "Main company data";
  mainStockDataRu:string = "Основные данны";
  mainStockDataEn: string = "Main company data";

  noValuation: string  = "Valuation is not possible because of negatvie growth values."
  noValuationRu: string  = "Оценка невозможна из-за отрицательных знчений роста прибыли."
  noValuationEn: string  = "Valuation is not possible because of negatvie growth values."

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
      this.valuationOverviewLabel = this.valuationOverviewLabelRu;
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

      this.downsidePotentialLabel = this.downsidePotentialLabelRu;
      this.upsidePotentialLabel = this.upsidePotentialLabelRu;

      this.growthRateCalcExplanation = this.growthRateCalcExplanationRu;
      
      this.growthLabel = this.growthLabelRu;
      this.netProfitLabel = this.netProfitLabelRu;
      this.metricLabel = this.metricLabelRu;

      this.mainStockData = this.mainStockDataRu;

      this.noValuation = this.noValuationRu;
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
      this.valuationOverviewLabel = this.valuationOverviewLabelEn;
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

      this.downsidePotentialLabel = this.downsidePotentialLabelEn;
      this.upsidePotentialLabel = this.upsidePotentialLabelEn;

      this.growthRateCalcExplanation = this.growthRateCalcExplanationEn;
      
      this.growthLabel = this.growthLabelEn;
      this.netProfitLabel = this.netProfitLabelEn;
      this.metricLabel = this.metricLabelEn;

      this.mainStockData = this.mainStockDataEn;

      this.noValuation = this.noValuationEn;

    }

    const tickerCode = this.route.snapshot.paramMap.get('ticker');
    const exchangeCode = this.route.snapshot.paramMap.get('exchange');
    this.ticker = tickerCode ? tickerCode : 'AAPL';
    this.exchange = exchangeCode ? exchangeCode : 'NYSE';
    this.ValuationServiceApi.getValuation(this.ticker, this.exchange).pipe().subscribe(data => {
      this.stockInfo = data['stockInfo'];
      this.valuation = data['valuation'];
      var shownFairPrice = this.round(this.valuation.fairPrice);
      var currentPrice = this.round(this.stockInfo.price);
      var percentPotential = this.round(this.valuation.resultPercent);
      var epsTtmRounded = this.round(this.stockInfo.epsTtm);
      if(this.valuation.resultLabel === "Undervalued" && language == 'ru'){
        this.undervaluedExplanation = `Акция является недооцененной по модели Питера Линча. Инвестиция в акцию ${this.stockInfo.name} (${this.ticker}) может иметь потенциал роста на ${percentPotential}% с учетом текущей рыночной цены $${currentPrice} и справедливой стоимости по формуле Питера Линча $${shownFairPrice}.`;
      }
      else if(this.valuation.resultLabel === "Undervalued" && language == 'en'){
        this.undervaluedExplanation = `According to Peter Lynch model this stock is undervalued. Investments into ${this.stockInfo.name} (${this.ticker}) can have growth potential of ${percentPotential}% with current price of $${currentPrice} and fair price calculated with Peter Lynch formula of $${shownFairPrice}.`;
      }
      else if(this.valuation.resultLabel === "Overvalued" && language == 'ru'){
        this.overvaluedExplanation = `Акция является переоцененной по модели Питера Линча. Инвестиция в акцию ${this.stockInfo.name} (${this.ticker}) может иметь потенциал снижения на ${percentPotential}% с учетом текущей рыночной цены $${currentPrice} и справедливой стоимости по формуле Питера Линча $${shownFairPrice}.`;
      }
      else if(this.valuation.resultLabel === "Overvalued" && language == 'en'){
        this.overvaluedExplanation = `According to Peter Lynch model this stock is overvalued. Investments into ${this.stockInfo.name} (${this.ticker}) can have downside potential of ${percentPotential}% with current price of $${currentPrice} and fair price calculated with Peter Lynch formula of $${shownFairPrice}.`;
      }
      if(language == 'ru'){
        this.fairPriceExplanation = `Справедливая стоимость акции ${this.stockInfo.name} (${this.ticker}) $${shownFairPrice} посчитана по формуле Питера Линча.`;
        this.howFairPriceWasCalulated = `Как была посчитана справедливая стоимость`;
        this.epsTtmExplanation = `Текущее значение базовой прибыли на акцию за последние 12 месяцев (EPS TTM, Earnings per share Trailing Twelve Months) составляет $${epsTtmRounded}.`
      }
      else if (language == 'en'){
        this.fairPriceExplanation = `Fair price of stock ${this.stockInfo.name} (${this.ticker}) $${shownFairPrice} is calculated based on Petere Lynch formula.`;
        this.howFairPriceWasCalulated = `How fair price was calculated`;
        this.epsTtmExplanation = `Current trailing twelve months earnings per share (EPS TTM) is $${epsTtmRounded}.`
      }
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

  uiRounding(value:number): string{
    if (value !== null){
      return (value).toFixed(2);
    }
    else{
      return "-"
    }
  }
}
