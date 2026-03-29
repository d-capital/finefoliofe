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
  ) { }
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
  epsTtmLabelRu: string = "Базовая прибыль на акцию (EPS TTM)";
  epsTtmLabelEn: string = "Basic Earnings Per Share (EPS TTM)";

  epsTtmLabelCompanyInfo: string = "EPS (TTM)";

  peTtmLabel: string = "P/E (TTM)";
  peTtmLabelRu: string = "Цена / прибыль (P/E TTM)";
  peTtmLabelEn: string = "Price to earnings ratio (P/E TTM)";

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

  fairPriceLabel: string = "Fair price";
  fairPriceLabelRu: string = "Справедливая цена";
  fairPriceLabelEn: string = "Fair price";

  resultLabel: string = "Result";
  resultLabelRu: string = "Результат";
  resultLabelEn: string = "Result";

  formulaLabel: string = "Formula";
  formulaLabelRu: string = "Формула";
  formulaLabelEn: string = "Formula";

  formulaExplanationLabel: string = "EPS x 5 Year Average Net Income Growth Rate";
  formulaExplanationLabelRu: string = "Темп роста чистой прибыли за 5 лет (Net Income Growth Rate 5 years) * Базовая прибыль на акцию за последние 12 месяцев (EPS TTM, Earnings per share Trailing Twelve Months) * Цена акции / Прибыль на акцию / Темп роста прибыли (PEG, Price / Earnings / Net IncomeGrowth Ratio) = Справедливая стоимость по формуле Питера Линча.";
  formulaExplanationLabelEn: string = "Net Income Growth Rate (5 years) * Basic Earnings per Share (EPS TTM, Earnings per share Trailing Twelve Months) * Price / Earnings per Share / Net Income Growth Rate (PEG) = Fair Value (FV)";

  maxGrowthRateNote: string = "Если темп роста чистой прибыли за 5 лет был больше 25% мы используем 25, так как Питер Линч называл рост более 25 процентов в год неустойчивым."
  maxGrowthRateNoteRu: string = "Если темп роста чистой прибыли за 5 лет был больше 25% мы используем 25, так как Питер Линч называл рост более 25 процентов в год неустойчивым."
  maxGrowthRateNoteEn: string = "If the net income growth rate over 5 years was greater than 25%, we use 25, since Peter Lynch called growth of more than 25 percent per year unsustainable."

  minimumValuesNote: string = "If basic earnings per share (EPS TTM) is less then 0, we would use 0 as EPS in the formula. If the net income growth rate over 5 years is less than 0%, we would use 0 for growth rate in the formula.";
  minimumValuesNoteRu: string = "Если базовая прибыль на акцию (EPS TTM) меньше 0, то в формуле используется значение 0 для EPS. Если темп роста чистой прибыли за 5 лет меньше 0%, то в формуле используется значение 0 для темпа роста.";
  minimumValuesNoteEn: string = "If basic earnings per share (EPS TTM) is less then 0, we would use 0 as EPS in the formula. If the net income growth rate over 5 years is less than 0%, we would use 0 for growth rate in the formula.";

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
  aboutLynchFormulaTextRu: string = "Мы считаем справедливую стоимость акции по следующей версии формулы Питера Линча.<br>Справедливая стоимость акции по Питеру Линчу = Темп роста прибыли (Net Income Growth Rate) * Базовая прибыль на акцию (EPS, Earnings per share).<br>Темп роста прибыли (Net Income Growth Rate) - это рост показателя чистая прибыль (Net Income) за последние 5 лет, посчитанный как арифметическое среднее за соответствующий период.<br>Базовая прибыль на акцию (EPS, Earnings per share) в нашей версии формулы - это базовая прибыль на акцию за последние 12 месяцев (EPS TTM, Earnings per share Trailing Twelve Months). Цена акции / Прибыль на акцию / Темп роста прибыли (PEG, Price / Earnings / Net IncomeGrowth Ratio) - это деление коэффициента Цена / прибыль (P / E, Price / Earnings Ratio) на прогнозируемый будущий темп роста прибыли компании (Net Income Growth Rate).";
  aboutLynchFormulaTextEn: string = "We calculate the fair value of a share using the following version of Peter Lynch's formula.<br>Fair value of a share according to Peter Lynch = Earnings Growth Rate * Basic Earnings per Share (EPS, Earnings per share) * Price / Earnings per Share / Net Income Growth Rate (PEG).<br>Net Income Growth Rate is the growth of net income over the past 5 years, calculated as arithmetic average.<br>Basic Earnings per Share (EPS, Earnings per share) in our version of the formula is basic earnings per share over the past 12 months (EPS TTM, Earnings per share Trailing Twelve Months). The Price / Earnings per Share / Net Income Growth Rate (PEG) is the Price/Earnings Ratio (P/E) divided by the company's projected future  Net Income Growth Rate.";

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

  growthRateCalcExplanation: string = "Темпы роста чистой прибыли (Net Income) за 1, 3, 5 лет посчтитаны как арифметическое среднее за соответсвующие периоды.";
  growthRateCalcExplanationRu: string = "Темпы роста чистой прибыли (Net Income) за 1, 3, 5 лет посчтитаны как арифметическое среднее за соответсвующие периоды.";
  growthRateCalcExplanationEn: string = "Net Income growth rate for 1, 3, 5 last years calculated as arithmetic average for the given period.";

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

  pegExplanation: string = "Price / Earnings per Share / Net Income Growth Rate (PEG) is calulated as Price to Earnings Ratio (P/E) divided by the company's projected future Net Income Growth Rate.";
  pegExplanationRu: string = "Коэффициент Цена акции / Прибыль на акцию / Темп роста прибыли (PEG, Price / Earnings / Net IncomeGrowth Ratio) расчитывается как коэффициент Цена акции / Прибыль на акцию (P/E, Price to Earnings Ratio) деленный на темп роста прибыли.";
  pegExplanationEn: string = "Price / Earnings per Share / Net Income Growth Rate (PEG) is calulated as Price to Earnings Ratio (P/E) divided by the company's projected future Net Income Growth Rate.";

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

  fcfLabel: string = "FCF";
  fcfLabelRu: string = "Свободный денежный поток (FCF)";
  fcfLabelEn: string = "Free cash flow (FCF)";

  deLabel: string = "D/E";
  deLabelRu: string = "Долг к собственному капиталу (D/E)";
  deLabelEn: string = "Debt to  equity (D/E)";

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
    "<b>Базовая прибыль на акцию (EPS TTM)</b> - значение полученное от TradingView (обновляется при открытии страницы)",
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
    "<b>Цена</b> - цена закрытия актива полученная от MOEX API (обновляется при открытии страницы)",
    "<b>Базовая прибыль на акцию (EPS TTM)</b> - значение из последнего квартального отчета (обновляется каждый квартал при публикации отчета)",
    "<b>Темп роста чистой прибыли (Net Income Growth Rate)</b> - значение из годового отчета компании (обновляется при публикации годовых отчетов, обычно в феврале-марте)",
  ];
  datapointsMoexEn: string[] = [
    "<b>Price</b> - close price of an asset from MOEX API (updates when you open the page)",
    "<b>EPS TTM</b> - value from the latest quarterly report (every quarter when report is published)",
    "<b>Net Income Growth Rate</b> - value from the latest yearly report (updates when yearly report is submitted, usually in February-March)",
  ];


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const params = this.route.snapshot.paramMap.get('exchange-ticker')?.split('-');
      const tickerCode = params ? params[1] : 'AAPL';
      const exchangeCode = params ? params[0] :  'NYSE';
      this.ticker = tickerCode ? tickerCode.toLocaleUpperCase() : 'AAPL';
      this.exchange = exchangeCode ? exchangeCode.toLocaleUpperCase() : 'NYSE';
      var language = localStorage.getItem('language');
      this.pageLanguage = language ? language : 'en';
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
        this.minimumValuesNote = this.minimumValuesNoteRu;

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
        
        this.titleService.setTitle(`Oценка акции ${this.ticker} (${this.exchange}) по Методу Питера Линча - Валестор`);
        this.metaService.updateTag({
          name: 'description',
          content: 'Узнайте справедливую стоимость акции ' + this.ticker + ' (' + this.exchange + ') по формуле Питера Линча. Наша автоматизированная оценка поможет вам определить, является ли акция недооцененной или переоцененной, и принять обоснованное инвестиционное решение.'
        });
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
        this.minimumValuesNote = this.minimumValuesNoteEn;

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

        this.titleService.setTitle(`${this.ticker} (${this.exchange}) stock valuation by Peter Lynch method - Valestor`);
        this.metaService.updateTag({
          name: 'description',
          content: 'Find out the fair value of ' + this.ticker + ' (' + this.exchange + ') stock using Peter Lynch formula. Our automated evaluation will help you determine if the stock is undervalued or overvalued, and make an informed investment decision.'
        });
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
        }
        if(this.valuation.fairPrice<0){
          this.valuation.fairPrice = 0;
        }
        if (this.valuation.resultLabel === "Undervalued" && language == 'ru') {
          this.undervaluedExplanation = `Акция является недооцененной по модели Питера Линча. Инвестиция в акцию ${this.stockInfo.name} (${this.ticker}) может иметь потенциал роста на ${percentPotential}% с учетом текущей рыночной цены ${currentPrice} и справедливой стоимости по формуле Питера Линча ${shownFairPrice}.`;
        }
        else if (this.valuation.resultLabel === "Undervalued" && language == 'en') {
          this.undervaluedExplanation = `According to Peter Lynch model this stock is undervalued. Investments into ${this.stockInfo.name} (${this.ticker}) can have growth potential of ${percentPotential}% with current price of ${currentPrice} and fair price calculated with Peter Lynch formula of ${shownFairPrice}.`;
        }
        else if (this.valuation.resultLabel === "Overvalued" && language == 'ru') {
          this.overvaluedExplanation = `Акция является переоцененной по модели Питера Линча. Инвестиция в акцию ${this.stockInfo.name} (${this.ticker}) может иметь потенциал снижения на ${percentPotential}% с учетом текущей рыночной цены ${currentPrice} и справедливой стоимости по формуле Питера Линча ${shownFairPrice}.`;
        }
        else if (this.valuation.resultLabel === "Overvalued" && language == 'en') {
          this.overvaluedExplanation = `According to Peter Lynch model this stock is overvalued. Investments into ${this.stockInfo.name} (${this.ticker}) can have downside potential of ${percentPotential}% with current price of ${currentPrice} and fair price calculated with Peter Lynch formula of ${shownFairPrice}.`;
        }
        if (language == 'ru') {
          this.fairPriceExplanation = `Справедливая стоимость акции ${this.stockInfo.name} (${this.ticker}) ${shownFairPrice} посчитана по формуле Питера Линча.`;
          this.howFairPriceWasCalulated = `Как была посчитана справедливая стоимость`;
          this.epsTtmExplanation = `Текущее значение базовой прибыли на акцию за последние 12 месяцев (EPS TTM, Earnings per share Trailing Twelve Months) составляет ${epsTtmRounded}.`
        }
        else if (language == 'en') {
          this.fairPriceExplanation = `Fair price of stock ${this.stockInfo.name} (${this.ticker}) ${shownFairPrice} is calculated based on Peter Lynch formula.`;
          this.howFairPriceWasCalulated = `How fair price was calculated`;
          this.epsTtmExplanation = `Current trailing twelve months earnings per share (EPS TTM) is ${epsTtmRounded}.`
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
      return "$N/A"
    }
  }

  uiRounding(value: number): string {
    if (value !== null) {
      return (value).toFixed(2);
    }
    else {
      return "N/A"
    }
  }

  mathRounding(value: number): string {
    if (value !== null) {
      return (value).toFixed(0);
    }
    else {
      return "N/A"
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
    var rate = ((current - prev)/ Math.abs(prev)) * 100
    return rate
  }
}
