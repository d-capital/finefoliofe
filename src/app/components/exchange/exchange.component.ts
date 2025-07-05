import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../../services/exchange.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ExchangeInfo } from '../../dto/exchange-info/exchange-info.model';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-exchange',
  imports: [NgIf, CommonModule],
  templateUrl: './exchange.component.html',
  styleUrl: './exchange.component.css'
})
export class ExchangeComponent implements OnInit {
  ticker: string = '';
  serverErrors = []
  exchangeInfo: ExchangeInfo = {} as ExchangeInfo;
  loading = true;
  //localization
  fields = [
    { label: 'Interest Rate (%)', first: 'first_currency_interest_rate', second: 'second_currency_interest_rate' },
    { label: 'Inflation Rate y/y (%)', first: 'first_currency_inflation_rate', second: 'second_currency_inflation_rate' },
    { label: 'Unemployment Rate (%)', first: 'first_currency_unemployment_rate', second: 'second_currency_unemployment_rate' },
    { label: 'GDP Growth Rate y/y (%)', first: 'first_currency_gdp_growth_rate', second: 'second_currency_gdp_growth_rate' },
  ];
  fieldsRu = [
    { label: 'Процентная ставка (%)', first: 'first_currency_interest_rate', second: 'second_currency_interest_rate' },
    { label: 'Инфляция г/г (%)', first: 'first_currency_inflation_rate', second: 'second_currency_inflation_rate' },
    { label: 'Безработица (%)', first: 'first_currency_unemployment_rate', second: 'second_currency_unemployment_rate' },
    { label: 'Рост ВВП г/г (%)', first: 'first_currency_gdp_growth_rate', second: 'second_currency_gdp_growth_rate' },
  ];

  fieldsEn = [
    { label: 'Interest Rate (%)', first: 'first_currency_interest_rate', second: 'second_currency_interest_rate' },
    { label: 'Inflation Rate y/y (%)', first: 'first_currency_inflation_rate', second: 'second_currency_inflation_rate' },
    { label: 'Unemployment Rate (%)', first: 'first_currency_unemployment_rate', second: 'second_currency_unemployment_rate' },
    { label: 'GDP Growth Rate y/y (%)', first: 'first_currency_gdp_growth_rate', second: 'second_currency_gdp_growth_rate' },
  ];

  header:string = "Currency Comparison";
  headerEn:string = "Currency Comparison";
  headerRu:string = "Сравнение Валют";
  
  loadingLabel:string = "Loading ...";
  loadingLabelRu:string = "Загружаю ...";
  loadingLabelEn:string = "Loading ...";
  
  exchangeRateLabel:string = "Exchange Rate:";
  exchangeRateLabelRu:string = "Обменный Курс:";
  exchangeRateLabelEn:string = "Exchange Rate:";

  forecastPppLabel:string = "Forecast (PPP):";
  forecastPppLabelRu:string = "Прогноз (PPP):";
  forecastPppLabelEn:string = "Forecast (PPP):";

  forecastRegressionLabel:string = "Regression Based Recommendation: ";
  forecastRegressionLabelRu:string = "Прогноз (Регрессия): ";
  forecastRegressionLabelEn:string = "Regression Based Recommendation: ";

  noteLabel:string = "Note: data provided here is update once a week!";
  noteLabelRu:string = "Примечание: представленные здесь данные обновляются раз в неделю!"
  noteLabelEn:string = "Note: data provided here is update once a week!";

  constructor(
    private ExchangeServiceApi: ExchangeService,
    private route: ActivatedRoute
  ) { 
    var language = localStorage.getItem('language');
    if(language == 'ru'){
      this.fields = this.fieldsRu;
      this.header = this.headerRu;
      this.loadingLabel = this.loadingLabelRu;
      this.exchangeRateLabel = this.exchangeRateLabelRu;
      this.forecastPppLabel = this.forecastPppLabelRu;
      this.forecastRegressionLabel = this.forecastRegressionLabelRu;
      this.noteLabel = this.noteLabelRu;
    }else{
      this.fields = this.fieldsEn;
      this.header = this.headerEn;
      this.loadingLabel = this.loadingLabelEn;
      this.exchangeRateLabel = this.exchangeRateLabelEn;
      this.forecastPppLabel = this.forecastPppLabelEn;
      this.forecastRegressionLabel = this.forecastRegressionLabelEn;
      this.noteLabel = this.noteLabelEn;
    }
  }
  ngOnInit(): void {
    const tickerCode = this.route.snapshot.paramMap.get('ticker');
    this.ticker = tickerCode ? tickerCode : '1';
    this.ExchangeServiceApi.getExchangeInfo(this.ticker).pipe().subscribe(data => {
      this.exchangeInfo = data;
      console.log(this.exchangeInfo);
      this.loading = false;
    },
      err => {
        if (err instanceof HttpErrorResponse) {

          if (err.status === 422) {
            this.serverErrors = err.error.message
          }
        }
      }
    )
  }

}
