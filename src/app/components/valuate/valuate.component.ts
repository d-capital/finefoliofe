import { CommonModule, formatDate, isPlatformBrowser, NgFor } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockInfo } from '../../dto/valuation/stock-info.model';
import { ValuationResult } from '../../dto/valuation/valuation.model';
import { ValuationService } from '../../services/valuation.service';
import { ErrorStateComponent } from '../error-state/error-state.component';
import { AbbreviateNumberPipe } from '../../custom-pipe/abbreviate-number.pipe';
import { TabsComponent } from '../tabs/tabs.component';
import { TabComponent } from '../tab/tab.component';
import { StockCardComponent } from '../stock-card/stock-card.component';
import { ChangeDetectorRef } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { GeoService } from '../../services/geo.service';
import remUrlsData from './remurls.json'; 
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-valuate',
  imports: [NgFor, CommonModule, ErrorStateComponent, AbbreviateNumberPipe, TabsComponent, TabComponent, StockCardComponent],
  templateUrl: './valuate.component.html',
  styleUrl: './valuate.component.css'
})
export class ValuateComponent implements OnInit {
  constructor(
    private ValuationServiceApi: ValuationService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title, 
    private metaService: Meta,
    private geoService: GeoService,
    private languageService: LanguageService
  ) { }
  private urlsToRemove: string[] = remUrlsData.urlsToRemove;
  stockInfo!: StockInfo;
  valuation!: ValuationResult;
  loading: boolean = true;
  error: boolean = false;
  serverErrors = [];
  ticker: string = 'AAPL';
  exchange: string = 'NYSE'

  //Localization
  loadingLabel: string = "Loading valuation data...";
  loadingLabelRu: string = "Загружаю данные для оценки...";
  loadingLabelEn: string = "Loading valuation data...";

  exchangeLabel: string = "Exchange: ";
  exchangeLabelRu: string = "Биржа: ";
  exchangeLabelEn: string = "Exchange: ";

  countryLabel: string = "Country: ";
  countryLabelRu: string = "Страна: ";
  countryLabelEn: string = "Country: ";

  stockInformationLabel: string = "Overview";
  stockInformationLabelRu: string = "Обзор";
  stockInformationLabelEn: string = "Overview";

  priceLabel: string = "Price:";
  priceLabelRu: string = "Цена:";
  priceLabelEn: string = "Price:";

  marketCapLabel: string = "Market Cap";
  marketCapLabelRu: string = "Рыночная капитализация";
  marketCapLabelEn: string = "Market Cap";

  sectorLabel: string = "Sector";
  sectorLabelRu: string = "Сектор";
  sectorLabelEn: string = "Sector";

  industryLabel: string = "Industry";
  industryLabelRu: string = "Индустрия";
  industryLabelEn: string = "Industry";

  epsTtmLabel: string = "EPS (TTM)";
  epsTtmLabelRu: string = "Прибыль на акцию за последние 12 месяцев (EPS TTM)";
  epsTtmLabelEn: string = "Earnings per Share Trailing Twelve Month (EPS TTM)";

  epsTtmLabelCompanyInfo: string = "EPS (TTM)";

  peTtmLabel: string = "P/E (TTM)";
  peTtmLabelRu: string = "Цена / прибыль (P/E TTM)";
  peTtmLabelEn: string = "Price / Earnings per Share (P/E TTM)";

  dividendsYieldLabel: string = "Dividend Yield";
  dividendsYieldLabelRu: string = "Дивидендная доходность";
  dividendsYieldLabelEn: string = "Dividend Yield";

  //valuation card
  valuationResultsLabel: string = "Valuation Result";
  valuationResultsLabelRu: string = "Резултат Оценки";
  valuationResultsLabelEn: string = "Valuation Result";

  valuationOverviewLabel: string = "Valuation";
  valuationOverviewLabelRu: string = "Оценка";
  valuationOverviewLabelEn: string = "Valuation";

  downsidePotentialLabel: string = "Downside potential";
  downsidePotentialLabelRu: string = "Потенциал снижения";
  downsidePotentialLabelEn: string = "Downside potential";

  upsidePotentialLabel: string = "Upside potential";
  upsidePotentialLabelRu: string = "Потенциал роста";
  upsidePotentialLabelEn: string = "Upside potential";

  fairPriceLabel: string = "Fair Price";
  fairPriceLabelRu: string = "Справедливая цена";
  fairPriceLabelEn: string = "Fair Price";

  resultLabel: string = "Result";
  resultLabelRu: string = "Результат";
  resultLabelEn: string = "Result";

  formulaLabel: string = "Formula";
  formulaLabelRu: string = "Формула";
  formulaLabelEn: string = "Formula";

  formulaExplanationLabel: string = "EPS x 5 Year Average Net Income Growth Rate";
  formulaExplanationLabelRu: string = "Темп роста чистой прибыли за 5 лет (Net Income Growth Rate 5 years) * Прибыль на акцию за последние 12 месяцев (EPS TTM, Earnings per Share Trailing Twelve Months)  = Справедливая стоимость по формуле Питера Линча.";
  formulaExplanationLabelEn: string = "Net Income Growth Rate (5 years) * Earnings per Share Trailing Twelve Month (EPS TTM) = Fair Value (FV)";

  maxGrowthRateNote: string = "Если темп роста чистой прибыли за 5 лет был больше 25% мы используем 25, так как Питер Линч называл рост более 25 процентов в год неустойчивым."
  maxGrowthRateNoteRu: string = "Если темп роста чистой прибыли за 5 лет был больше 25% мы используем 25, так как Питер Линч называл рост более 25 процентов в год неустойчивым."
  maxGrowthRateNoteEn: string = "If the Net Income Growth Rate over 5 years was greater than 25%, we use 25, since Peter Lynch called growth of more than 25 percent per year unsustainable."

  notEnoughDataNote:string = "If the Earnings per Share Trailing Twelve Month (EPS TTM) and/or Net Income Growth Rate over 5 years is less than 0 or missing, then the fair value estimate using the formula is not possible.";
  notEnoughDataNoteRu:string = "Если прибыль на акцию за последние 12 месяцев (EPS TTM) и/или темп роста чистой прибыли (Net Income Growth Rate) меньше 0 или отсутствует, то оценка справедливой стоимости по формуле невозможна.";
  notEnoughDataNoteEn:string = "If the Earnings per Share (EPS TTM) and/or Net Income Growth Rate over 5 years is less than 0 or missing, then the fair value estimate using the formula is not possible.";

  //historicalProfit
  netProfitGrowthLabel: string = "Net Income";
  netProfitGrowthLabelRu: string = "Темп роста чистой прибыли (Net Income Growth Rate)";
  netProfitGrowthLabelEn: string = "Net Income Growth Rate";

  averageIncomeGrowthLabel: string = "Average Growth:";
  averageIncomeGrowthLabelRu: string = "Средний Показатели Роста Чистой Прибыли";
  averageIncomeGrowthLabelEn: string = "Average Growth:";

  averageIncomeGrowthTtm: string = "TTM: ";
  averageIncomeGrowthTtmRu: string = "темп роста чистой прибыли (Net Income) за 1 год.";
  averageIncomeGrowthTtmEn: string = "trailing 12 month Net Income growth rate (TTM).";

  averageThreeYearsGrowth: string = "3 Years: ";
  averageThreeYearsGrowthRu: string = "темп роста чистой прибыли (Net Income) за 3 года.";
  averageThreeYearsGrowthEn: string = "3 years Net Income growth rate.";

  averageFiveYearsGrowth: string = "5 Years: ";
  averageFiveYearsGrowthRu: string = "темп роста чистой прибыли (Net Income) за 5 лет.";
  averageFiveYearsGrowthEn: string = "5 years Net Income growth rate.";

  //lynch explanation
  aboutLynchFormulaLabel: string = "About Lynch Formula";
  aboutLynchFormulaLabelRu: string = "Формула Питера Линча";
  aboutLynchFormulaLabelEn: string = "About Lynch Formula";

  aboutLynchFormulaText: string = "The Lynch model helps estimate a stock's fair price based on earnings and growth expectations. It is often used by value investors to determine whether a stock is undervalued or overvalued.";
  aboutLynchFormulaTextRu: string = "<p>Мы считаем справедливую стоимость акции по следующей версии формулы Питера Линча. Справедливая стоимость акции по Питеру Линчу = Темп роста прибыли (Net Income Growth Rate) * прибыль на акцию за последние 12 месяцев (EPS TTM, Earnings per Share Trailing Twelve Month). Темп роста прибыли (Net Income Growth Rate) - это рост показателя чистая прибыль (Net Income) за последние 5 лет, посчитанный, как совокупный среднегодовой темп роста (CAGR, Compound Annual Growth Rate) за соответствующий период.</p><p>Формула совокупного среднегодового темпа роста (CAGR, Compound Annual Growth Rate) модифицирована так, чтобы учитывать случаи когда начальное значение (B) отрицательное: для этого из конечного значения (E) вычитается начальное значение (B) и добавляется модуль начального значения (|B|) в числителе, в знаменателе при этом берется модуль начального значения (|B|).</p> ";
  aboutLynchFormulaTextEn: string = "<p>We calculate the fair value of a share using the following version of Peter Lynch's formula. Fair value of a share according to Peter Lynch = Net Income Growth Rate * Earnings per Share Trailing Twelve Month (EPS TTM). Net Income Growth Rate is calculated as Compound Annual Growth Rate (CAGR) for the last 5 years.</p><p>Compound Annual Growth Rate (CAGR) formula is modified to account for cases when beginning value (B) is negative by subtracting beginning value (B) and adding absolute value of beginning value(|B|) from ending value (E) in nominator and diving it by absolute value of beginning value(|B|).</p>";

  aboutFullNegativeCagr: string = "<p>If ending (E) and beginning (B) values are negative we take absolute value of division of ending by beginning value (|E/B|) and multiply result by -1.</p>";
  aboutFullNegativeCagrRu: string = "<p>Если конечное (E) и начальное (B) значения отрицательные или результат деления отрицательный мы берем модуль деления конечного значения на начальное значениие (|E/B|) умножая полученное значение на -1.</p>";
  aboutFullNegativeCagrEn: string = "<p>If ending (E) and beginning (B) values are negative or result of division is negative we take absolute value of division of ending by beginning value (|E/B|) and multiply result by -1.</p>";

  undervaluedLabel: string = "Undervalued";
  undervaluedLabelRu: string = "Недооценена";
  undervaluedLabelEn: string = "Undervalued";

  overvaluedLabel: string = "Overvalued";
  overvaluedLabelRu: string = "Переоценена";
  overvaluedLabelEn: string = "Overvalued";

  overvaluedExplanation: string = "";
  undervaluedExplanation: string = "";

  fairPriceExplanation: string = "";
  howFairPriceWasCalulated: string = "";

  growthRateCalcExplanation: string = "<p>Темпы роста чистой прибыли (Net Income) за 1, 3, 5 лет посчтитаны как совокупный среднегодовой темп роста (CAGR) за соответсвующие периоды. Формула модифицирована, чтобы учитывать отрицательные начальное и конечное значения.</p>";
  growthRateCalcExplanationRu: string = "<p>Темпы роста чистой прибыли (Net Income) за 1, 3, 5 лет посчтитаны как совокупный среднегодовой темп роста (CAGR) за соответсвующие периоды. Формула модифицирована, чтобы учитывать отрицательные начальное и конечное значения.</p>";
  growthRateCalcExplanationEn: string = "<p>Net Income growth rate for 1, 3, 5 last years calculated as compound average growth rate (CAGR). The formula is modified to account for negative beginning and ending values.</p>";

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

  pegLabel: string = "PEG";
  pegLabelRu: string = "Цена акции / Прибыль на акцию / Темп роста прибыли (PEG)";
  pegLabelEn: string = "Price / Earnings per Share / Net Income Growth Rate (PEG)";

  pegExplanation: string = "Price / Earnings per Share / Net Income Growth Rate (PEG) is calulated as Price divivded by Earnings per Share divided by the company's historical Net Income Growth Rate. If Net Income Growth Rate is more than 25%, we use 25% to calculate PEG ratio.";
  pegExplanationRu: string = "Коэффициент Цена акции / Прибыль на акцию / Темп роста прибыли (PEG, Price / Earnings per Share / Net Income Growth Ratio) расчитывается как цена акции деленная на прибыль на акцию (Earnings per Share) деленная на темп роста прибыли. Если темп роста прибыли более 25%, мы используем 25% для расчета PEG.";
  pegExplanationEn: string = "Price / Earnings per Share / Net Income Growth Rate (PEG) is calulated as Price divivded by Earnings per Share divided by the company's historical Net Income Growth Rate. If Net Income Growth Rate is more than 25%, we use 25% to calculate PEG ratio.";

  pegFairLabel:string = "Fairly valued";
  pegOverLabel:string = "Overvalued";
  pegUnderLabel:string = "Undervalued";

  pegFairLabelEn:string = "Stock is fairly valued according to Peter Lynch value investing model.";
  pegOverLabelEn:string = "Stock is overvalued according to Peter Lynch value investing model.";
  pegUnderLabelEn:string = "Stock is undervalued according to Peter Lynch value investing model.";

  pegFairLabelRu:string = "Акция спарведливо оценена по методу Питера Линча.";
  pegOverLabelRu:string = "Акция переоценена по методу Питера Линча.";
  pegUnderLabelRu:string = "Акция недооценена по методу Питера Линча.";

  mainStockData: string = "About company";
  mainStockDataRu: string = "О компании";
  mainStockDataEn: string = "About company";

  finanacialOverviewLabel: string = "Financials";
  finanacialOverviewLabelRu: string = "Финансовые показатели";
  finanacialOverviewLabelEn: string = "Financials";

  noValuation: string = "Valuation is not possible because of negatvie growth values."
  noValuationRu: string = "Оценка невозможна из-за отрицательных значений роста прибыли."
  noValuationEn: string = "Valuation is not possible because of negatvie growth values."

  noValuationData: string = "Valuation is not possible because of missing data on "
  noValuationDataRu: string = "Оценка невозможна из-за отсутствия данных o "
  noValuationDataEn: string = "Valuation is not possible because of missing data on "

  noValuationLabel: string = "Valuation is not possible";
  noValuationLabelRu: string = "Оценка невозможна";
  noValuationLabelEn: string = "Valuation is not possible";

  fcfLabel: string = "FCF";
  fcfLabelRu: string = "Свободный денежный поток (FCF)";
  fcfLabelEn: string = "Free Cash Flow (FCF)";

  deLabel: string = "D/E";
  deLabelRu: string = "Долг к собственному капиталу (D/E)";
  deLabelEn: string = "Debt to Equity (D/E)";

  pageLanguage!: string;

  dcfValuation!: number;
  dcfValuationResult!: string;
  dcfValuationPercentage!: number;
  dcfValuationLoaded: boolean = false;

  dcfError:boolean = false;

  displayTime: string = 'Loading...';

  reliableDataSources: string = "Reliable Data Sources";
  reliableDataSourcesRu: string = "Надежные источники данных";
  reliableDataSourcesEn: string = "Reliable Data Sources";

  datapoints: string[] = [
    "<b>Price</b> - close price of an asset from TradingView (updates when you open the page)",
    "<b>EPS TTM</b> - value from TradingView (updates when you open the page)",
    "<b>Net Income Growth Rate</b> - value from SEC fillings (updates when yearly SEC fillings are submitted, usually in February-March)",
  ];
  datapointsRu: string[] = [
    "<b>Цена</b> - цена закрытия актива полученная от TradingView (обновляется при открытии страницы)",
    "<b>Прибыль на акцию за последние 12 месяцев (EPS TTM)</b> - значение полученное от TradingView (обновляется при открытии страницы)",
    "<b>Темп роста чистой прибыли (Net Income Growth Rate)</b> - значение из отчетов SEC (обновляется при публикации годовых отчетов SEC, обычно в феврале-марте)",
  ];
  datapointsEn: string[] = [
    "<b>Price</b> - close price of an asset from TradingView (updates when you open the page)",
    "<b>EPS TTM</b> - value from TradingView (updates when you open the page)",
    "<b>Net Income Growth Rate</b> - value from SEC fillings (updates when yearly SEC fillings are submitted, usually in February-March)",
  ];

  datapointsMoex: string[] = [
    "<b>Price</b> - close price of an asset from MOEX API (updates when you open the page)",
    "<b>EPS TTM</b> - value from the latest quarterly report (every quarter when report is published)",
    "<b>Net Income Growth Rate</b> - value from the latest yearly report (updates when yearly report is submitted, usually in February-March)",
  ];
  datapointsMoexRu: string[] = [
    "<b>Цена</b> - цена закрытия актива полученная от MOEX API, обновляется при открытии страницы.",
    "<b>Прибыль на акцию за последние 12 месяцев (EPS TTM)</b> - значение из последнего квартального отчета, обновляется каждый квартал при публикации отчета.",
    "<b>Темп роста чистой прибыли (Net Income Growth Rate)</b> - значение из годового отчета компании, обновляется при публикации годовых отчетов, обычно в феврале-марте.",
  ];
  datapointsMoexEn: string[] = [
    "<b>Price</b> - close price of an asset from MOEX API, is updated when you open the page.",
    "<b>EPS TTM</b> - value from the latest quarterly report, is updated every quarter when report is published.",
    "<b>Net Income Growth Rate</b> - value from the latest yearly report, is updated when yearly report is submitted, usually in February-March.",
  ];

  naText: string = "N/A";
  naTextRu: string = "Н/Д";
  naTextEn: string = "N/A";

  noValuationAvailable: boolean = false;

  noValuationExplanation: string = `Peter Lynch's fair value formula is designed for growing companies with positive Earnings per Share Trailing Twelve Month (EPS TTM > 0) and a positive growth rate of net income (Net Income Growth Rate > 0). COMPANY_NAME (TICKER_ON_PAGE) has a negative or missing EPS TTM and/or negative or missing Net Income Growth Rate. Under these conditions, Peter Lynch's formula results in a negative fair value and loses economic meaning or can not be calculated at all.`;

  noValuationExplanationRu: string = `Формула справедливой стоимости Питера Линча рассчитана на растущие компании с положительной прибылью на акцию за последние 12 месяцев (EPS TTM > 0) и положительным темпом роста чистой прибыли (Net Icome Growth Rate > 0). У COMPANY_NAME (TICKER_ON_PAGE) значение прибыли на акцию  за последние 12 месяцев (EPS TTM) и/или темп роста прибыли (Net Icome Growth Rate) отрицательно либо отсутствует. При таких данных формула Питера Линча либо дает отрицательную справедливую цену и теряет экономический смысл либо вообще не может быть посчитана.`;

  noValuationExplanationEn: string = `Peter Lynch's fair value formula is designed for growing companies with positive Earnings per Share Trailing Twelve Month (EPS TTM > 0) and a positive growth rate of net income (Net Income Growth Rate > 0). COMPANY_NAME (TICKER_ON_PAGE) has a negative or missing EPS TTM and/or negative or missing Net Income Growth Rate. Under these conditions, Peter Lynch's formula results in a negative fair value and loses economic meaning or can not be calculated at all.`;

  noPegExplanation: string = `PEG of stock COMPANY_NAME (TICKER_ON_PAGE) cannot be calculated based on Peter Lynch formula due to negative or missing Earnings per Share Trailing Twelve Month (EPS TTM) and/or Net Income Growth Rate over 5 years.`;
  noPegExplanationEn: string = `PEG of stock COMPANY_NAME (TICKER_ON_PAGE) cannot be calculated based on Peter Lynch formula due to negative or missing Earnings per Share Trailing Twelve Month (EPS TTM) and/or Net Income Growth Rate over 5 years.`;
  noPegExplanationRu: string = `Коэффициент Цена акции / Прибыль на акцию / Темп роста прибыли (PEG) акции COMPANY_NAME (TICKER_ON_PAGE) не может быть рассчитан по формуле Питера Линча из-за отрицательной или отсутсвующей прибыли на акцию за последние 12 месяцев (EPS TTM) и/или темпа роста прибыли (Net Income Growth Rate) за 5 лет.`;

  noFairPriceExplanation: string = `Fair price of stock COMPANY_NAME (TICKER_ON_PAGE) cannot be calculated based on Peter Lynch formula due to negative or missing Earnings per Share Trailing Twelve Month (EPS TTM) and/or Net Income Growth Rate over 5 years.`;
  noFairPriceExplanationEn: string = `Fair price of stock COMPANY_NAME (TICKER_ON_PAGE) cannot be calculated based on Peter Lynch formula due to negative or missing Earnings per Share Trailing Twelve Month (EPS TTM) and/or Net Income Growth Rate over 5 years.`;
  noFairPriceExplanationRu: string = `Справедливая цена акции COMPANY_NAME (TICKER_ON_PAGE) не может быть рассчитана по формуле Питера Линча из-за отрицательной или отсутствующей прибыли на акцию за последние 12 месяцев (EPS TTM) и/или темпа роста прибыли (Net Income Growth Rate) за 5 лет .`;

  noAverageGrowthData:boolean = false;

  legalTextNeeded:boolean = false;
  legalText:string = '';
  legalTextRu: string = '*признана экстремистской, запрещена на территории РФ.';
  legalTextEn: string = '*is regonzide as extrimist, forbidden on the territory of Russian Federation.'

  noNetProfitHistory:{ year: string; value: string }[] = []

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const params = this.route.snapshot.paramMap.get('exchange-ticker')?.split('-');
      const exchangeAndTicker = this.route.snapshot.paramMap.get('exchange-ticker') ?? "AAPL";
      this.updateNoIndexTag(exchangeAndTicker);
      const tickerCode = params ? decodeURI(params[1]) : 'AAPL';
      const exchangeCode = params ? params[0] :  'NYSE';
      this.ticker = tickerCode ? tickerCode.toLocaleUpperCase() : 'AAPL';
      this.exchange = exchangeCode ? exchangeCode.toLocaleUpperCase() : 'NYSE';
      var language = localStorage.getItem('language');
      this.pageLanguage = language ? language : 'en';
      this.languageService.getLabels(this.pageLanguage, ['valuation']).pipe().subscribe(
        data => {
          this.loadingLabel = data.labels.find((l: any) => l.label === 'loadingLabel')?.text || '';
          this.exchangeLabel = data.labels.find((l: any) => l.label === 'exchangeLabel')?.text || '';
          this.countryLabel = data.labels.find((l: any) => l.label === 'countryLabel')?.text || '';
          this.stockInformationLabel = data.labels.find((l: any) => l.label === 'stockInformationLabel')?.text || '';
          this.priceLabel = data.labels.find((l: any) => l.label === 'priceLabel')?.text || '';
          this.marketCapLabel = data.labels.find((l: any) => l.label === 'marketCapLabel')?.text || '';
          this.sectorLabel = data.labels.find((l: any) => l.label === 'sectorLabel')?.text || '';
          this.industryLabel = data.labels.find((l: any) => l.label === 'industryLabel')?.text || '';
          this.epsTtmLabel = data.labels.find((l: any) => l.label === 'epsTtmLabel')?.text || '';
          this.peTtmLabel = data.labels.find((l: any) => l.label === 'peTtmLabel')?.text || '';
          this.dividendsYieldLabel = data.labels.find((l: any) => l.label === 'dividendsYieldLabel')?.text || '';

          //valuation card
          this.valuationResultsLabel = this.valuationResultsLabelRu;
          this.valuationOverviewLabel = this.valuationOverviewLabelRu;
          this.fairPriceLabel = this.fairPriceLabelRu;
          this.resultLabel = this.resultLabelRu;
          this.formulaLabel = this.formulaLabelRu;
          this.formulaExplanationLabel = this.formulaExplanationLabelRu;
          this.maxGrowthRateNote = this.maxGrowthRateNoteRu;

          //historicalProfit
          this.netProfitGrowthLabel = this.netProfitGrowthLabelRu;
          this.averageIncomeGrowthLabel = this.averageIncomeGrowthLabelRu;
          this.averageIncomeGrowthTtm = this.averageIncomeGrowthTtmRu;
          this.averageThreeYearsGrowth = this.averageThreeYearsGrowthRu;
          this.averageFiveYearsGrowth = this.averageFiveYearsGrowthRu;

          //lynch explanation
          this.aboutLynchFormulaLabel = this.aboutLynchFormulaLabelRu;
          this.aboutLynchFormulaText = this.aboutLynchFormulaTextRu;//missing

          this.undervaluedLabel = this.undervaluedLabelRu;
          this.overvaluedLabel = this.overvaluedLabelRu;

          this.downsidePotentialLabel = this.downsidePotentialLabelRu;
          this.upsidePotentialLabel = this.upsidePotentialLabelRu;

          this.growthRateCalcExplanation = this.growthRateCalcExplanationRu;//missing

          this.growthLabel = this.growthLabelRu;
          this.netProfitLabel = this.netProfitLabelRu;
          this.metricLabel = this.metricLabelRu;

          this.mainStockData = this.mainStockDataRu;
          this.finanacialOverviewLabel = this.finanacialOverviewLabelRu;

          this.noValuation = this.noValuationRu;
          this.noValuationData = this.noValuationDataRu;

          this.pegLabel = this.pegLabelRu;
          this.pegExplanation = this.pegExplanationRu;//missing

          this.fcfLabel = this.fcfLabelRu;
          this.deLabel = this.deLabelRu;
          
          this.reliableDataSources = this.reliableDataSourcesRu;
          if (this.exchange === 'MOEX'){
            this.datapoints = this.datapointsMoexRu;//missing
          }
          else{
            this.datapoints = this.datapointsRu;//missing
          }

          //peg over and under
          this.pegFairLabel = this.pegFairLabelRu;
          this.pegOverLabel = this.pegOverLabelRu;
          this.pegUnderLabel = this.pegUnderLabelRu;

          //cagr additional explanation in about the formula
          this.aboutFullNegativeCagr = this.aboutFullNegativeCagrRu; //missing
          this.naText = this.naTextRu;

          this.noValuationLabel = this.noValuationLabelRu;
          this.noValuationExplanation = this.noValuationExplanationRu; //missing

          this.noPegExplanation = this.noPegExplanationRu; //missing
          this.noFairPriceExplanation = this.noFairPriceExplanationRu; //missing
          this.notEnoughDataNote = this.notEnoughDataNoteRu;
        }
      );
      if (language == 'ru') {
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
        this.maxGrowthRateNote = this.maxGrowthRateNoteRu;

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
        this.finanacialOverviewLabel = this.finanacialOverviewLabelRu;

        this.noValuation = this.noValuationRu;
        this.noValuationData = this.noValuationDataRu;

        this.pegLabel = this.pegLabelRu;
        this.pegExplanation = this.pegExplanationRu;

        this.fcfLabel = this.fcfLabelRu;
        this.deLabel = this.deLabelRu;
        
        this.reliableDataSources = this.reliableDataSourcesRu;
        if (this.exchange === 'MOEX'){
          this.datapoints = this.datapointsMoexRu;
        }
        else{
          this.datapoints = this.datapointsRu;
        }

        //peg over and under
        this.pegFairLabel = this.pegFairLabelRu;
        this.pegOverLabel = this.pegOverLabelRu;
        this.pegUnderLabel = this.pegUnderLabelRu;

        //cagr additional explanation in about the formula
        this.aboutFullNegativeCagr = this.aboutFullNegativeCagrRu;
        this.naText = this.naTextRu;

        this.noValuationLabel = this.noValuationLabelRu;
        this.noValuationExplanation = this.noValuationExplanationRu;

        this.noPegExplanation = this.noPegExplanationRu;
        this.noFairPriceExplanation = this.noFairPriceExplanationRu;
        this.notEnoughDataNote = this.notEnoughDataNoteRu;

      }
      else if (language == 'es') {
        this.loadingLabel = "Cargando datos de valoración...";
        this.exchangeLabel = "Intercambio: ";
        this.countryLabel = "País: ";
        this.stockInformationLabel = "Resumen";
        this.priceLabel = "Precio:";
        this.marketCapLabel = "Capitalización de mercado";
        this.sectorLabel = "Sector";
        this.industryLabel = "Industria";
        this.epsTtmLabel = "EPS (TTM)";
        this.peTtmLabel = "P/E (TTM)";
        this.dividendsYieldLabel = "Rendimiento de dividendos";

        //valuation card
        this.valuationResultsLabel = "Resultado de la valoración";
        this.valuationOverviewLabel = "Valoración";
        this.fairPriceLabel = "Precio Justo";
        this.resultLabel = "Resultado";
        this.formulaLabel = "Fórmula";
        this.formulaExplanationLabel = "EPS x Tasa de crecimiento promedio de ingreso neto de 5 años";
        this.maxGrowthRateNote = "Si la tasa de crecimiento del ingreso neto en 5 años fue mayor al 25 %, usamos 25, ya que Peter Lynch consideraba insostenible un crecimiento superior al 25 % anual.";

        //historicalProfit
        this.netProfitGrowthLabel = "Ingreso Neto";
        this.averageIncomeGrowthLabel = "Crecimiento Promedio:";
        this.averageIncomeGrowthTtm = "TTM: ";
        this.averageThreeYearsGrowth = "3 Años: ";
        this.averageFiveYearsGrowth = "5 Años: ";

        //lynch explanation
        this.aboutLynchFormulaLabel = "Acerca de la Fórmula de Lynch";
        this.aboutLynchFormulaText = "<p>Calculamos el valor justo de una acción usando la siguiente versión de la fórmula de Peter Lynch. Valor justo de una acción según Peter Lynch = Tasa de crecimiento del ingreso neto * Ganancias por acción de los últimos 12 meses (EPS TTM). La tasa de crecimiento del ingreso neto se calcula como la tasa de crecimiento anual compuesta (CAGR) durante los últimos 5 años.</p><p>La fórmula de CAGR se modifica para tener en cuenta casos en los que el valor inicial (B) es negativo, restando el valor inicial (B) y añadiendo el valor absoluto de B al valor final (E) en el numerador, y dividiéndolo por el valor absoluto del valor inicial (|B|).</p>";

        this.undervaluedLabel = "Subvaluado";
        this.overvaluedLabel = "Sobrevalorado";

        this.downsidePotentialLabel = "Potencial de caída";
        this.upsidePotentialLabel = "Potencial de subida";

        this.growthRateCalcExplanation = "<p>La tasa de crecimiento del ingreso neto (Net Income) para 1, 3 y 5 años se calcula como la tasa de crecimiento promedio anual compuesta (CAGR). La fórmula se modifica para considerar valores negativos iniciales y finales.</p>";

        this.growthLabel = "Crecimiento Año contra Año (%)";
        this.netProfitLabel = "Ingreso Neto";
        this.metricLabel = "Métrica";

        this.mainStockData = "Acerca de la empresa";
        this.finanacialOverviewLabel = "Aspectos financieros";

        this.noValuation = "La valoración no es posible debido a valores de crecimiento negativos.";
        this.noValuationData = "La valoración no es posible debido a la falta de datos sobre ";

        this.pegLabel = "PEG";
        this.pegExplanation = "Precio / Ganancias por Acción / Tasa de Crecimiento del Ingreso Neto (PEG) se calcula como el precio dividido por las ganancias por acción dividido por la tasa de crecimiento del ingreso neto histórico de la empresa. Si la tasa de crecimiento del ingreso neto es mayor al 25 %, usamos 25 % para calcular el PEG.";

        this.fcfLabel = "Flujo de caja libre (FCF)";
        this.deLabel = "Deuda a Capital (D/E)";
        
        this.reliableDataSources = "Fuentes de datos confiables";
        if (this.exchange === 'MOEX'){
          this.datapoints = [
            "<b>Precio</b> - precio de cierre de un activo de MOEX API (se actualiza cuando abres la página)",
            "<b>EPS TTM</b> - valor del último informe trimestral (se actualiza cada trimestre cuando se publica el informe)",
            "<b>Tasa de crecimiento del ingreso neto</b> - valor del último informe anual (se actualiza cuando se presenta el informe anual, generalmente en febrero-marzo)",
          ];
        }
        else{
          this.datapoints = [
            "<b>Precio</b> - precio de cierre de un activo de TradingView (se actualiza cuando abres la página)",
            "<b>EPS TTM</b> - valor de TradingView (se actualiza al abrir la página)",
            "<b>Tasa de crecimiento del ingreso neto</b> - valor de los informes de la SEC (se actualiza cuando se presentan los informes anuales de la SEC, generalmente en febrero-marzo)",
          ];
        }

        //peg over and under
        this.pegFairLabel = "Justamente valorado";
        this.pegOverLabel = "Sobrevalorado";
        this.pegUnderLabel = "Subvaluado";

        //cagr additional explanation in about the formula
        this.aboutFullNegativeCagr = "<p>Si los valores final (E) e inicial (B) son negativos o el resultado de la división es negativo, tomamos el valor absoluto de la división de E por B (|E/B|) y multiplicamos el resultado por -1.</p>";
        this.naText = "N/A";

        this.noValuationLabel = "Valoración no posible";
        this.noValuationExplanation = "La fórmula de valor justo de Peter Lynch está diseñada para empresas en crecimiento con ganancias por acción de los últimos 12 meses positivas (EPS TTM > 0) y una tasa de crecimiento positiva del ingreso neto (Net Income Growth Rate > 0). COMPANY_NAME (TICKER_ON_PAGE) tiene EPS TTM negativo o ausente y/o una tasa de crecimiento del ingreso neto negativa o ausente. En estas condiciones, la fórmula de Peter Lynch da como resultado un valor justo negativo y pierde significado económico o no puede calcularse.";

        this.noPegExplanation = "El PEG de la acción COMPANY_NAME (TICKER_ON_PAGE) no puede calcularse según la fórmula de Peter Lynch debido a EPS TTM negativo o ausente y/o tasa de crecimiento del ingreso neto de 5 años negativa o ausente.";

        this.noFairPriceExplanation = "El precio justo de la acción COMPANY_NAME (TICKER_ON_PAGE) no puede calcularse según la fórmula de Peter Lynch debido a EPS TTM negativo o ausente y/o tasa de crecimiento del ingreso neto de 5 años negativa o ausente.";

        this.notEnoughDataNote = "Si las Ganancias por Acción de los últimos 12 meses (EPS TTM) y/o la tasa de crecimiento del ingreso neto en 5 años son menores que 0 o faltan, la estimación del valor justo usando la fórmula no es posible.";
      }
      else {
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
        this.maxGrowthRateNote = this.maxGrowthRateNoteEn;

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
        this.finanacialOverviewLabel = this.finanacialOverviewLabelEn;

        this.noValuation = this.noValuationEn;
        this.noValuationData = this.noValuationDataEn;

        this.pegLabel = this.pegLabelEn;
        this.pegExplanation = this.pegExplanationEn;

        this.fcfLabel = this.fcfLabelEn;
        this.deLabel = this.deLabelEn;

        this.reliableDataSources = this.reliableDataSourcesEn;
        if (this.exchange === 'MOEX'){
          this.datapoints = this.datapointsMoexEn;
        }
        else{
          this.datapoints = this.datapointsEn;
        }

        //peg over and under
        this.pegFairLabel = this.pegFairLabelEn;
        this.pegOverLabel = this.pegOverLabelEn;
        this.pegUnderLabel = this.pegUnderLabelEn;
        this.aboutFullNegativeCagr = this.aboutFullNegativeCagrEn;

        this.naText = this.naTextEn;

        this.noValuationLabel = this.noValuationLabelEn;
        this.noValuationExplanation = this.noValuationExplanationEn;

        this.noPegExplanation = this.noPegExplanationEn;
        this.noFairPriceExplanation = this.noFairPriceExplanationEn;
        this.notEnoughDataNote = this.notEnoughDataNoteEn;
      }
      if(this.ticker === "META"){
        this.legalTextNeeded = true;
        if(language === "ru"){
          this.legalText = this.legalTextRu;
        } else if (language === "es") {
          this.legalText = "*es reconocida como extremista, prohibida en el territorio de la Federación Rusa.";
        } else {
          this.legalText = this.legalTextEn;
        }
      }
      const now = new Date();
      const timeStr = formatDate(now, 'HH:mm', 'en-US');
      
      // Calculate GMT offset
      const offsetMinutes = -now.getTimezoneOffset();
      const offsetHours = offsetMinutes / 60;
      const gmtStr = `GMT${offsetHours >= 0 ? '+' : ''}${offsetHours}`;

      this.displayTime = `${timeStr} ${gmtStr}`;
      this.ValuationServiceApi.getValuation(this.ticker, this.exchange).pipe().subscribe(data => {
        this.stockInfo = data['stockInfo'];
        this.valuation = data['valuation'];
        var shownFairPrice = this.round(this.valuation.fairPrice, this.exchange);
        var currentPrice = this.round(this.stockInfo.price, this.exchange);
        var percentPotential = this.round(this.valuation.resultPercent, "noexchange");
        var epsTtmRounded = this.round(this.stockInfo.epsTtm, this.exchange);
        if(this.valuation.fairPrice<0){
          this.valuation.fairPrice = 0;
        }
        if(language == "ru"){
          if (!this.stockInfo.epsTtm && this.valuation.avgGrowth){
            this.noValuationData += "EPS.";
          }
          if (this.stockInfo.epsTtm && !this.valuation.avgGrowth){
            this.noValuationData += "темпе роста чистой прибыли.";
          }
          if (!this.stockInfo.epsTtm && !this.valuation.avgGrowth){
            this.noValuationData += "EPS и темпе роста чистой прибыли.";
          }
          this.titleService.setTitle(`Оценка акции ${this.truncateStockName(this.stockInfo.name)} (${this.ticker}) по методу Питера Линча | Валестор`);
          this.metaService.updateTag({
            name: 'description',
            content: 'Рассчитай справедливую стоимость акции ' + this.truncateStockName(this.stockInfo.name) + ' (' + this.ticker + ') по методу Питера Линча. Узнай, переоценена или недооценена акция, ее потенциал роста или снижения перед покупкой или продажей.'
          });
        }
        if(language == "en"){
          if (!this.stockInfo.epsTtm && this.valuation.avgGrowth){
            this.noValuationData += "EPS.";
          }
          if (this.stockInfo.epsTtm && !this.valuation.avgGrowth){
            this.noValuationData += "Net Income Growth Rate.";
          }
          if (!this.stockInfo.epsTtm && !this.valuation.avgGrowth){
            this.noValuationData += "EPS and Net Income Growth Rate.";
          }
          this.titleService.setTitle(`${this.truncateStockName(this.stockInfo.name)} (${this.ticker}) Peter Lynch Fair Value | Valestor.сom`);
          this.metaService.updateTag({
            name: 'description',
            content: 'Calculate ' + this.truncateStockName(this.stockInfo.name) + ' (' + this.ticker + ') fair value using the Peter Lynch formula. Find out if the stock is undervalued or overvalued, its upside or downside potential before you buy or sell.'
          });
        } else if (language == "es") {
          if (!this.stockInfo.epsTtm && this.valuation.avgGrowth){
            this.noValuationData += "EPS.";
          }
          if (this.stockInfo.epsTtm && !this.valuation.avgGrowth){
            this.noValuationData += "tasa de crecimiento del ingreso neto.";
          }
          if (!this.stockInfo.epsTtm && !this.valuation.avgGrowth){
            this.noValuationData += "EPS y tasa de crecimiento del ingreso neto.";
          }
          this.titleService.setTitle(`Valoración de ${this.truncateStockName(this.stockInfo.name)} (${this.ticker}) según Peter Lynch | Valestor.com`);
          this.metaService.updateTag({
            name: 'description',
            content: 'Calcula el valor justo de ' + this.truncateStockName(this.stockInfo.name) + ' (' + this.ticker + ') usando la fórmula de Peter Lynch. Descubre si la acción está subvaluada o sobrevalorada, su potencial de subida o caída antes de comprar o vender.'
          });
        }
        if (this.valuation.resultLabel === "Undervalued" && language == 'ru') {
          this.undervaluedExplanation = `Акция является недооцененной по модели Питера Линча. Инвестиция в акцию ${this.stockInfo.name} (${this.ticker}) может иметь потенциал роста на ${percentPotential}% с учетом текущей рыночной цены ${currentPrice} и справедливой стоимости по формуле Питера Линча ${shownFairPrice}.`;
        }
        else if (this.valuation.resultLabel === "Undervalued" && language == 'en') {
          this.undervaluedExplanation = `According to Peter Lynch model this stock is undervalued. Investments into ${this.stockInfo.name} (${this.ticker}) can have growth potential of ${percentPotential}% with current price of ${currentPrice} and fair price calculated with Peter Lynch formula of ${shownFairPrice}.`;
        }
        else if (this.valuation.resultLabel === "Undervalued" && language == 'es') {
          this.undervaluedExplanation = `Según el modelo de Peter Lynch, esta acción está subvaluada. Las inversiones en ${this.stockInfo.name} (${this.ticker}) pueden tener un potencial de crecimiento de ${percentPotential}% con el precio actual de ${currentPrice} y el precio justo calculado con la fórmula de Peter Lynch de ${shownFairPrice}.`;
        }
        else if (this.valuation.resultLabel === "Overvalued" && language == 'ru') {
          this.overvaluedExplanation = `Акция является переоцененной по модели Питера Линча. Инвестиция в акцию ${this.stockInfo.name} (${this.ticker}) может иметь потенциал снижения на ${percentPotential}% с учетом текущей рыночной цены ${currentPrice} и справедливой стоимости по формуле Питера Линча ${shownFairPrice}.`;
        }
        else if (this.valuation.resultLabel === "Overvalued" && language == 'en') {
          this.overvaluedExplanation = `According to Peter Lynch model this stock is overvalued. Investments into ${this.stockInfo.name} (${this.ticker}) can have downside potential of ${percentPotential}% with current price of ${currentPrice} and fair price calculated with Peter Lynch formula of ${shownFairPrice}.`;
        }
        else if (this.valuation.resultLabel === "Overvalued" && language == 'es') {
          this.overvaluedExplanation = `Según el modelo de Peter Lynch, esta acción está sobrevalorada. Las inversiones en ${this.stockInfo.name} (${this.ticker}) pueden tener un potencial de caída de ${percentPotential}% con el precio actual de ${currentPrice} y el precio justo calculado con la fórmula de Peter Lynch de ${shownFairPrice}.`;
        }
        if (language == 'ru') {
          this.fairPriceExplanation = `Справедливая стоимость акции ${this.stockInfo.name} (${this.ticker}) ${shownFairPrice} посчитана по формуле Питера Линча.`;
          this.howFairPriceWasCalulated = `Как была посчитана справедливая стоимость`;
          this.epsTtmExplanation = `Текущее значение базовой прибыли на акцию за последние 12 месяцев (EPS TTM, Earnings per Share Trailing Twelve Months) составляет ${epsTtmRounded}.`
        }
        else if (language == 'en') {
          this.fairPriceExplanation = `Fair price of stock ${this.stockInfo.name} (${this.ticker}) ${shownFairPrice} is calculated based on Peter Lynch formula.`;
          this.howFairPriceWasCalulated = `How Fair Price Was Calculated`;
          this.epsTtmExplanation = `Current trailing twelve months Earnings per Share (EPS TTM) is ${epsTtmRounded}.`
        }
        else if (language == 'es') {
          this.fairPriceExplanation = `El precio justo de la acción ${this.stockInfo.name} (${this.ticker}) ${shownFairPrice} se calcula según la fórmula de Peter Lynch.`;
          this.howFairPriceWasCalulated = `Cómo se calculó el precio justo`;
          this.epsTtmExplanation = `Las ganancias por acción de los últimos doce meses (EPS TTM) actuales son ${epsTtmRounded}.`;
        }
        this.noValuationExplanation = this.noValuationExplanation.replace('COMPANY_NAME', this.stockInfo.name).replace('TICKER_ON_PAGE', this.ticker);
        this.noPegExplanation = this.noPegExplanation.replace('COMPANY_NAME', this.stockInfo.name).replace('TICKER_ON_PAGE', this.ticker);
        this.noFairPriceExplanation = this.noFairPriceExplanation.replace('COMPANY_NAME', this.stockInfo.name).replace('TICKER_ON_PAGE', this.ticker);
        this.noValuationAvailable = this.valuation.avgGrowth === null || 
          this.valuation.avgGrowth !==null && this.valuation.avgGrowth.fiveYears === null || 
          this.valuation.avgGrowth !==null && this.valuation.avgGrowth.fiveYears !==null && this.valuation.avgGrowth.fiveYears <= 0 ||
          this.stockInfo.epsTtm === null ||
          this.stockInfo.epsTtm !==null && this.stockInfo.epsTtm <= 0 ;
        
        if(this.valuation.avgGrowth === null){
          this.valuation.avgGrowth = {
            ttm: 0,
            threeYears: 0,
            fiveYears: 0
          };
          this.noAverageGrowthData = true;
          this.noNetProfitHistory = [
            {
              year:"2021",
              value: this.naText,
            },
            {
              year:"2022",
              value: this.naText,
            },
            {
              year:"2023",
              value: this.naText,
            },
            {
              year:"2024",
              value: this.naText,
            },
            {
              year:"2025",
              value: this.naText,
            }
          ]
          this.valuation.formula = this.getValuationFormula(
            this.naText,
            this.round(this.stockInfo.epsTtm, this.exchange),
            this.round(this.valuation.fairPrice, this.exchange)
          );
        }else{
          if (this.valuation.avgGrowth.fiveYears<25){
            this.valuation.formula = this.getValuationFormula(
              this.round(this.valuation.avgGrowth.fiveYears, 'noexchange'),
              this.round(this.stockInfo.epsTtm, this.exchange),
              this.round(this.valuation.fairPrice, this.exchange)
            );
          }else{
            this.valuation.formula = this.getValuationFormula(
              this.round(25,'noexchange'),
              this.round(this.stockInfo.epsTtm, this.exchange),
              this.round(this.valuation.fairPrice, this.exchange)
            );
          }
        }

        this.loading = false;
      },
        (err: HttpErrorResponse) => {
          if (err instanceof HttpErrorResponse && err.status === 404) {
            this.error = true;
            this.loading = false;
            this.cdr.detectChanges();
          } else {
            // Другие ошибки (например, 500, сеть и т.д.)
            console.error('Unexpected error:', err);
            this.error = true;
            this.loading = false;
            this.cdr.detectChanges();
          }
        }
      )
    }
  }

  async getRussianUser(){
    return await this.geoService.isRussianUser()
  }

  round(value: number, exchange: string): string {
    if (value !== null) {
      if (exchange === "MOEX") {
        return "₽" + (value).toFixed(2);
      }
      else if (exchange === 'noexchange') {
        return (value).toFixed(2);
      }
      else {
        return "$" + (value).toFixed(2);
      }

    }
    else {
      return this.naText;
    }
  }

  uiRounding(value: number): string {
    if (value !== null) {
      return (value).toFixed(2);
    }
    else {
      return this.naText;
    }
  }

  mathRounding(value: number): string {
    if (value !== null) {
      return (value).toFixed(0);
    }
    else {
      return this.naText;
    }
  }

  getDcfValuation() {
    this.ValuationServiceApi.getDcfValuation(this.ticker, this.exchange).pipe().subscribe(data => {
      this.dcfValuation = data;
      if (this.dcfValuation !== null && this.dcfValuation > this.stockInfo.price) {
        this.dcfValuationLoaded = true;
        this.dcfValuationResult = "Undervalued";
        this.dcfValuationPercentage = parseFloat(this.round(((this.dcfValuation - this.stockInfo.price) / this.stockInfo.price) * 100, "noexchange"));
      } else if (this.dcfValuation !== null && this.dcfValuation < this.stockInfo.price) {
        this.dcfValuationResult = "Overvalued";
        this.dcfValuationPercentage = parseFloat(this.round(((this.dcfValuation - this.stockInfo.price) / this.stockInfo.price) * 100, "noexchange"));
        this.dcfValuationLoaded = true;
      }
    },
      (err: HttpErrorResponse) => {
        if (err instanceof HttpErrorResponse && err.status === 404) {
          this.dcfValuationLoaded = true;
          this.dcfError = true;
          this.cdr.detectChanges();
        } else {
          // Другие ошибки (например, 500, сеть и т.д.)
          console.error('Unexpected error:', err);
          this.dcfValuationLoaded = true;
          this.dcfError = true;
          this.cdr.detectChanges();
        }
      }
  
  )
  }

  getYearToYearGrowhtRate(prev:number, current: number):number{
    if (prev === 0 && current<0){
      return -100
    }else if (prev === 0 && current>0){
      return 100;
    }else{
      var rate = ((current - prev)/ Math.abs(prev)) * 100
      return rate
    }
  }

  truncateStockName(name: string): string {
    if (name.length > 30) {
      return name.substring(0, 27) + "...";
    }
    return name;
  }

  calculateCagr(
    beginningValue: number,
    endingValue: number,
    numberOfYears: number
  ): number {
    if (numberOfYears <= 0) {
      throw new Error("Number of years must be greater than zero.");
    }

    // Handle division by zero
    let start = beginningValue === 0 ? 0.1 : beginningValue;

    let cagr: number;

    if (endingValue < 0 && start < 0) {
      /**
       * Calculates CAGR for negative start and end value:
       * ((|Ending / Beginning|)^(1/n) - 1
       */
      if (Math.abs(endingValue)<Math.abs(beginningValue)){
        cagr = (Math.pow(Math.abs(endingValue / start), 1 / numberOfYears) - 1)*-1;
      }
      else {
        cagr = (Math.pow(Math.abs(endingValue / start), 1 / numberOfYears) - 1);
      }
    } else {
      /**
       * Calculates CAGR based on formula:
       * ((Ending - Beginning + |Beginning|) / |Beginning|)^(1/n) - 1
       */
      const absBeg = Math.abs(start);
      const numerator = endingValue - start + absBeg;
      if ((numerator / absBeg)<0){
        cagr = (Math.pow(Math.abs(numerator / absBeg), 1 / numberOfYears) - 1)*-1;
      }
      else {
        cagr = Math.pow(numerator / absBeg, 1 / numberOfYears) - 1;
      }
    }

    return cagr*100;
  };

  getValuationFormula(averageGrowthRate: string, eps: string, fairPrice: string): string {
    const format = (val: string) => {
      if (val.includes('-')) {
        const symbol = val.charAt(0); // Gets "₽"
        const numberPart = val.substring(1); // Gets "36.07"
        return `${symbol}(${numberPart})`;
      }
      return val;
    };

    averageGrowthRate = format(averageGrowthRate);
    eps = format(eps);
    fairPrice = format(fairPrice);
    if (this.noValuationAvailable){
      fairPrice = this.naText;
    }

    return `${averageGrowthRate} X ${eps} = ${fairPrice}`;
  }


  private updateNoIndexTag(exchangeAndTicker:string) {
    const robots = this.urlsToRemove.includes(exchangeAndTicker) 
      ? 'noindex' 
      : 'index';
    
    this.metaService.updateTag({ name: 'robots', content: robots });
  }
  
} 
