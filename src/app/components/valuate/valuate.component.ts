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
import { RecommendedBrokersComponent } from '../recommended-brokers/recommended-brokers.component';
import { ChangeDetectorRef } from '@angular/core';
import { Inject, PLATFORM_ID, Injector } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { GeoService } from '../../services/geo.service';
import remUrlsData from './remurls.json';
import languageLabels from './languages.json'; 

@Component({
  selector: 'app-valuate',
  imports: [NgFor, CommonModule, ErrorStateComponent, AbbreviateNumberPipe, TabsComponent, TabComponent, StockCardComponent, RecommendedBrokersComponent],
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
    private geoService: GeoService
  ) { }
  private urlsToRemove: string[] = remUrlsData.urlsToRemove;
  private languageLabels: any[] = languageLabels;
  stockInfo!: StockInfo;
  valuation!: ValuationResult;
  isPreviousDayData!:boolean;
  loading: boolean = true;
  error: boolean = false;
  serverErrors = [];
  ticker: string = 'AAPL';
  exchange: string = 'NYSE'

  //Localization
  loadingLabel: string = "Loading valuation data...";
  loadingLabelRu: string = "Загружаю данные для оценки...";
  loadingLabelEs: string = "Loading valuation data...";

  exchangeLabel: string = "Exchange: ";
  exchangeLabelRu: string = "Биржа: ";
  exchangeLabelEs: string = "Intercambio: ";

  countryLabel: string = "Country: ";
  countryLabelRu: string = "Страна: ";
  countryLabelEs: string = "País: ";

  stockInformationLabel: string = "Overview";
  stockInformationLabelRu: string = "Обзор";
  stockInformationLabelEs: string = "Resumen";

  priceLabel: string = "Price:";
  priceLabelRu: string = "Цена:";
  priceLabelEs: string = "Precio:";

  marketCapLabel: string = "";

  sectorLabel: string = "";

  industryLabel: string = "";

  epsTtmLabel: string = "EPS (TTM)";
  epsTtmLabelRu: string = "Прибыль на акцию за последние 12 месяцев (EPS TTM)";
  epsTtmLabelEs: string = "Ganancias por acción de los últimos doce meses (EPS TTM)";

  epsTtmLabelCompanyInfo: string = "EPS (TTM)";

  peTtmLabel: string = "P/E (TTM)";
  peTtmLabelRu: string = "Цена / прибыль (P/E TTM)";
  peTtmLabelEs: string = "Precio/Beneficio por Acción (P/E TTM)";

  dividendsYieldLabel: string = "";

  //valuation card
  valuationResultsLabel: string = "Valuation Result";
  valuationResultsLabelRu: string = "Резултат Оценки";
  valuationResultsLabelEs: string = "Resultado de la valoración";

  valuationOverviewLabel: string = "Valuation";
  valuationOverviewLabelRu: string = "Оценка";
  valuationOverviewLabelEs: string = "Valoración";

  downsidePotentialLabel: string = "Downside potential";
  downsidePotentialLabelRu: string = "Потенциал снижения";
  downsidePotentialLabelEs: string = "Potencial de desventaja";

  upsidePotentialLabel: string = "Upside potential";
  upsidePotentialLabelRu: string = "Потенциал роста";
  upsidePotentialLabelEs: string = "Potencial alcista";

  fairPriceLabel: string = "Fair Price";
  fairPriceLabelRu: string = "Справедливая цена";
  fairPriceLabelEs: string = "Precio justo";

  resultLabel: string = "Result";
  resultLabelRu: string = "Результат";
  resultLabelEs: string = "Resultado";

  formulaLabel: string = "Formula";
  formulaLabelRu: string = "Формула";
  formulaLabelEs: string = "Fórmula";

  formulaExplanationLabel: string = "Net Income Growth Rate (5 years) * Earnings per Share Trailing Twelve Month (EPS TTM) = Fair Value (FV).";
  formulaExplanationLabelRu: string = "Темп роста чистой прибыли за 5 лет (Net Income Growth Rate 5 years) * Прибыль на акцию за последние 12 месяцев (EPS TTM, Earnings per Share Trailing Twelve Months)  = Справедливая стоимость по формуле Питера Линча.";
  formulaExplanationLabelEs: string = "Tasa de crecimiento de los ingresos netos (5 años) * Ganancias por acción de los últimos doce meses (EPS TTM) = Valor razonable (FV).";

  maxGrowthRateNote: string = "";

  notEnoughDataNote:string = "If the Earnings per Share (EPS TTM) and/or Net Income Growth Rate over 5 years is less than 0 or missing, then the fair value estimate using the formula is not possible.";
  notEnoughDataNoteRu:string = "Если прибыль на акцию за последние 12 месяцев (EPS TTM) и/или темп роста чистой прибыли (Net Income Growth Rate) меньше 0 или отсутствует, то оценка справедливой стоимости по формуле невозможна.";
  notEnoughDataNoteEs:string = "Si las ganancias por acción (EPS TTM) y/o la tasa de crecimiento de los ingresos netos durante 5 años son inferiores a 0 o no están disponibles, entonces no es posible realizar la estimación del valor razonable utilizando la fórmula.";

  //historicalProfit
  netProfitGrowthLabel: string = "";
  averageIncomeGrowthLabel: string = "";
  averageIncomeGrowthTtm: string = "";
  averageThreeYearsGrowth: string = "";
  averageFiveYearsGrowth: string = "";

  //lynch explanation
  aboutLynchFormulaLabel: string = "";
  aboutLynchFormulaText: string = "";

  aboutFullNegativeCagr: string = "";

  undervaluedLabel: string = "Undervalued";
  undervaluedLabelRu: string = "Недооценена";
  undervaluedLabelEs: string = "Infravalorada";

  overvaluedLabel: string = "Overvalued";
  overvaluedLabelRu: string = "Переоценена";
  overvaluedLabelEs: string = "Sobrevalorada";

  overvaluedExplanation: string = "";
  undervaluedExplanation: string = "";
  fairPriceExplanation: string = "";
  howFairPriceWasCalulated: string = "";
  growthRateCalcExplanation: string = "";
  metricLabel: string = "";
  netProfitLabel: string = "";
  growthLabel: string = "";
  epsTtmExplanation: string = "";
  pegLabel: string = "";
  pegExplanation: string = "";

  pegFairLabel:string = "Stock is fairly valued according to Peter Lynch value investing model.";
  pegOverLabel:string = "Stock is overvalued according to Peter Lynch value investing model.";
  pegUnderLabel:string = "Stock is undervalued according to Peter Lynch value investing model.";

  pegFairLabelEs:string = "Según el modelo de inversión en valor de Peter Lynch, la acción está valorada de forma justa.";
  pegOverLabelEs:string = "Según el modelo de inversión en valor de Peter Lynch, la acción está sobrevalorada.";
  pegUnderLabelEs:string = "Según el modelo de inversión en valor de Peter Lynch, la acción está infravalorada.";

  pegFairLabelRu:string = "Акция спарведливо оценена по методу Питера Линча.";
  pegOverLabelRu:string = "Акция переоценена по методу Питера Линча.";
  pegUnderLabelRu:string = "Акция недооценена по методу Питера Линча.";

  mainStockData: string = "About company";
  mainStockDataRu: string = "О компании";
  mainStockDataEs: string = "Acerca de la empresa";

  finanacialOverviewLabel: string = "Financials";
  finanacialOverviewLabelRu: string = "Финансовые показатели";
  finanacialOverviewLabelEs: string = "Finanzas";

  noValuation: string = "Valuation is not possible because of negatvie growth values."
  noValuationRu: string = "Оценка невозможна из-за отрицательных значений роста прибыли."
  noValuationEs: string = "La valoración no es posible debido a los valores de crecimiento negativos."

  noValuationData: string = "Valuation is not possible because of missing data on "
  noValuationDataRu: string = "Оценка невозможна из-за отсутствия данных o "
  noValuationDataEs: string = "La valoración no es posible debido a la falta de datos sobre "

  noValuationLabel: string = "Valuation is not possible";
  noValuationLabelRu: string = "Оценка невозможна";
  noValuationLabelEs: string = "La valoración no es posible";

  fcfLabel: string = "";
  deLabel: string = "";

  pageLanguage!: string;

  dcfValuation!: number;
  dcfValuationResult!: string;
  dcfValuationPercentage!: number;
  dcfValuationLoaded: boolean = false;

  dcfError:boolean = false;

  displayTime: string = 'Loading...';

  reliableDataSources: string = "Reliable Data Sources";
  reliableDataSourcesRu: string = "Надежные источники данных";
  reliableDataSourcesEn: string = "Fuentes de Datos Fiables";

  datapoints: string[] = [];
  datapointsMoex: string[] = [];

  naText: string = "N/A";
  naTextRu: string = "Н/Д";
  naTextEs: string = "N/A";

  noValuationAvailable: boolean = false;

  noValuationExplanation: string = `Peter Lynch's fair value formula is designed for growing companies with positive Earnings per Share Trailing Twelve Month (EPS TTM > 0) and a positive growth rate of net income (Net Income Growth Rate > 0). COMPANY_NAME (TICKER_ON_PAGE) has a negative or missing EPS TTM and/or negative or missing Net Income Growth Rate. Under these conditions, Peter Lynch's formula results in a negative fair value and loses economic meaning or can not be calculated at all.`;
  noValuationExplanationRu: string = `Формула справедливой стоимости Питера Линча рассчитана на растущие компании с положительной прибылью на акцию за последние 12 месяцев (EPS TTM > 0) и положительным темпом роста чистой прибыли (Net Icome Growth Rate > 0). У COMPANY_NAME (TICKER_ON_PAGE) значение прибыли на акцию  за последние 12 месяцев (EPS TTM) и/или темп роста прибыли (Net Icome Growth Rate) отрицательно либо отсутствует. При таких данных формула Питера Линча либо дает отрицательную справедливую цену и теряет экономический смысл либо вообще не может быть посчитана.`;
  noValuationExplanationEs: string = `La fórmula de valor razonable de Peter Lynch está diseñada para empresas en crecimiento con ganancias por acción de los últimos doce meses (EPS TTM > 0) positivas y una tasa de crecimiento de ingresos netos positiva (Tasa de crecimiento de ingresos netos > 0). COMPANY_NAME (TICKER_ON_PAGE) tiene un EPS TTM negativo o faltante y/o una tasa de crecimiento de ingresos netos negativa o faltante. En estas condiciones, la fórmula de Peter Lynch resulta en un valor razonable negativo y pierde su significado económico o no puede calcularse en absoluto.`;

  noPegExplanation: string = `PEG of stock COMPANY_NAME (TICKER_ON_PAGE) cannot be calculated based on Peter Lynch formula due to negative or missing Earnings per Share Trailing Twelve Month (EPS TTM) and/or Net Income Growth Rate over 5 years.`;
  noPegExplanationEs: string = `La relación Precio/Beneficios por Acción/Tasa de Crecimiento de Beneficios (PEG) para COMPANY_NAME (TICKER_ON_PAGE) no se puede calcular utilizando la fórmula de Peter Lynch debido a que los BPA TTM y/o la tasa de crecimiento de los ingresos netos a 5 años son negativos o faltan.`;
  noPegExplanationRu: string = `Коэффициент Цена акции / Прибыль на акцию / Темп роста прибыли (PEG) акции COMPANY_NAME (TICKER_ON_PAGE) не может быть рассчитан по формуле Питера Линча из-за отрицательной или отсутсвующей прибыли на акцию за последние 12 месяцев (EPS TTM) и/или темпа роста прибыли (Net Income Growth Rate) за 5 лет.`;

  noFairPriceExplanation: string = `Fair price of stock COMPANY_NAME (TICKER_ON_PAGE) cannot be calculated based on Peter Lynch formula due to negative or missing Earnings per Share Trailing Twelve Month (EPS TTM) and/or Net Income Growth Rate over 5 years.`;
  noFairPriceExplanationEs: string = `El precio justo de las acciones de COMPANY_NAME (TICKER_ON_PAGE) no se puede calcular según la fórmula de Peter Lynch debido a que las ganancias por acción de los últimos doce meses (EPS TTM) son negativas o faltan, y/o la tasa de crecimiento de los ingresos netos es menor durante 5 años.`;
  noFairPriceExplanationRu: string = `Справедливая цена акции COMPANY_NAME (TICKER_ON_PAGE) не может быть рассчитана по формуле Питера Линча из-за отрицательной или отсутствующей прибыли на акцию за последние 12 месяцев (EPS TTM) и/или темпа роста прибыли (Net Income Growth Rate) за 5 лет .`;

  noAverageGrowthData:boolean = false;

  legalTextNeeded:boolean = false;
  legalText:string = '*is recognized as extremist, forbidden on the territory of Russian Federation.';
  legalTextRu: string = '*признана экстремистской, запрещена на территории РФ.';
  legalTextEs: string = '*es reconocida como extremista, prohibida en el territorio de la Federación Rusa.'

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
      this.applyLanguageLabels();
      if(this.ticker === "META"){
        this.legalTextNeeded = true;
        if(language === "ru"){
          this.legalText = this.legalTextRu;
        } else if (language === "es") {
          this.legalText = this.legalTextEs;
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
        this.isPreviousDayData = data['isPreviousDayData'];
        if (this.isPreviousDayData){
          const now = new Date();
          const updateTimeUTC = Date.UTC(
              now.getFullYear(), 
              now.getMonth(), 
              now.getDate(), 
              2, 0, 0
          );
          const updateDate = new Date(updateTimeUTC);
          const userTime = new Intl.DateTimeFormat(navigator.language, {
              hour: 'numeric',
              minute: 'numeric',
              timeZoneName: 'short'
          }).format(updateDate);
          this.displayTime = userTime;
        }
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

  private getFallbackText(label: string): string {
    const baseText = (this as any)[label] ?? '';
    if (this.pageLanguage === 'ru') {
      return (this as any)[`${label}Ru`] ?? baseText;
    }
    if (this.pageLanguage === 'es') {
      return (this as any)[`${label}Es`] ?? baseText;
    }
    return baseText;
  }

  private getLabel(label: string, fallback?: string): string {
    const found = this.languageLabels.find((item: any) =>
      item.language === this.pageLanguage &&
      item.component === 'valuate' &&
      item.label === label
    );

    return found?.text ?? (fallback ?? this.getFallbackText(label));
  }

  private applyLanguageLabels(): void {
    this.loadingLabel = this.getLabel('loadingLabel', this.loadingLabel);
    this.exchangeLabel = this.getLabel('exchangeLabel', this.exchangeLabel);
    this.countryLabel = this.getLabel('countryLabel', this.countryLabel);
    this.stockInformationLabel = this.getLabel('stockInformationLabel', this.stockInformationLabel);
    this.priceLabel = this.getLabel('priceLabel', this.priceLabel);
    this.marketCapLabel = this.getLabel('marketCapLabel', this.marketCapLabel);
    this.sectorLabel = this.getLabel('sectorLabel', this.sectorLabel);
    this.industryLabel = this.getLabel('industryLabel', this.industryLabel);
    this.epsTtmLabel = this.getLabel('epsTtmLabel', this.epsTtmLabel);
    this.peTtmLabel = this.getLabel('peTtmLabel', this.peTtmLabel);
    this.dividendsYieldLabel = this.getLabel('dividendsYieldLabel', this.dividendsYieldLabel);

    this.valuationResultsLabel = this.getLabel('valuationResultsLabel', this.valuationResultsLabel);
    this.valuationOverviewLabel = this.getLabel('valuationOverviewLabel', this.valuationOverviewLabel);
    this.fairPriceLabel = this.getLabel('fairPriceLabel', this.fairPriceLabel);
    this.resultLabel = this.getLabel('resultLabel', this.resultLabel);
    this.formulaLabel = this.getLabel('formulaLabel', this.formulaLabel);
    this.formulaExplanationLabel = this.getLabel('formulaExplanationLabel', this.formulaExplanationLabel);
    this.maxGrowthRateNote = this.getLabel('maxGrowthRateNote', this.maxGrowthRateNote);

    this.netProfitGrowthLabel = this.getLabel('netProfitGrowthLabel', this.netProfitGrowthLabel);
    this.averageIncomeGrowthLabel = this.getLabel('averageIncomeGrowthLabel', this.averageIncomeGrowthLabel);
    this.averageIncomeGrowthTtm = this.getLabel('averageIncomeGrowthTtm', this.averageIncomeGrowthTtm);
    this.averageThreeYearsGrowth = this.getLabel('averageThreeYearsGrowth', this.averageThreeYearsGrowth);
    this.averageFiveYearsGrowth = this.getLabel('averageFiveYearsGrowth', this.averageFiveYearsGrowth);

    this.aboutLynchFormulaLabel = this.getLabel('aboutLynchFormulaLabel', this.aboutLynchFormulaLabel);
    this.aboutLynchFormulaText = this.getLabel('aboutLynchFormulaText', this.aboutLynchFormulaText);

    this.undervaluedLabel = this.getLabel('undervaluedLabel', this.undervaluedLabel);
    this.overvaluedLabel = this.getLabel('overvaluedLabel', this.overvaluedLabel);
    this.downsidePotentialLabel = this.getLabel('downsidePotentialLabel', this.downsidePotentialLabel);
    this.upsidePotentialLabel = this.getLabel('upsidePotentialLabel', this.upsidePotentialLabel);
    this.growthRateCalcExplanation = this.getLabel('growthRateCalcExplanation', this.growthRateCalcExplanation);

    this.growthLabel = this.getLabel('growthLabel', this.growthLabel);
    this.netProfitLabel = this.getLabel('netProfitLabel', this.netProfitLabel);
    this.metricLabel = this.getLabel('metricLabel', this.metricLabel);

    this.mainStockData = this.getLabel('mainStockData', this.mainStockData);
    this.finanacialOverviewLabel = this.getLabel('finanacialOverviewLabel', this.finanacialOverviewLabel);
    this.noValuation = this.getLabel('noValuation', this.noValuation);
    this.noValuationData = this.getLabel('noValuationData', this.noValuationData);

    this.pegLabel = this.getLabel('pegLabel', this.pegLabel);
    this.pegExplanation = this.getLabel('pegExplanation', this.pegExplanation);
    this.fcfLabel = this.getLabel('fcfLabel', this.fcfLabel);
    this.deLabel = this.getLabel('deLabel', this.deLabel);
    this.reliableDataSources = this.getLabel('reliableDataSources', this.reliableDataSources);
    this.pegFairLabel = this.getLabel('pegFairLabel', this.pegFairLabel);
    this.pegOverLabel = this.getLabel('pegOverLabel', this.pegOverLabel);
    this.pegUnderLabel = this.getLabel('pegUnderLabel', this.pegUnderLabel);
    this.aboutFullNegativeCagr = this.getLabel('aboutFullNegativeCagr', this.aboutFullNegativeCagr);
    this.naText = this.getLabel('naText', this.naText);
    this.noValuationLabel = this.getLabel('noValuationLabel', this.noValuationLabel);
    this.noValuationExplanation = this.getLabel('noValuationExplanation', this.noValuationExplanation);
    this.noPegExplanation = this.getLabel('noPegExplanation', this.noPegExplanation);
    this.noFairPriceExplanation = this.getLabel('noFairPriceExplanation', this.noFairPriceExplanation);
    this.notEnoughDataNote = this.getLabel('notEnoughDataNote', this.notEnoughDataNote);

    if (this.exchange === 'MOEX') {
      this.datapoints = [
        this.getLabel('datapointsMoex1', ''),
        this.getLabel('datapointsMoex2', ''),
        this.getLabel('datapointsMoex3', '')
      ];
    } else {
      this.datapoints = [
        this.getLabel('datapoints1', ''),
        this.getLabel('datapoints2', ''),
        this.getLabel('datapoints3', '')
      ];
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
