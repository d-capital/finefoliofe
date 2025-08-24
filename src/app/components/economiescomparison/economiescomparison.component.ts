import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Country } from '../../dto/exchange-info/country.model';

@Component({
  selector: 'app-economiescomparison',
  imports: [NgFor],
  templateUrl: './economiescomparison.component.html',
  styleUrl: './economiescomparison.component.css'
})
export class EconomiescomparisonComponent {
  countries: Country[] = [];
  countriesList = ['usd', 'eur', 'gbp', 'cad', 'jpy', 'chf', 'aud', 'nzd'];
  serverErrors = [];
  countryMap = new Map<string, string>();
  
  //localization
  tableTitle = "Economic Indicators by country";
  tableTitleRu = "Экономические показатели стран";

  countryLabel = "Country";
  countryLabelRu = "Страна";

  gdpLabel = "GDP Growth";
  gdpLabelRu = "Рост ВВП";

  interestRateLabel = "Interest Rate";
  interestRateLabelRu = "Ключевая Ставка";

  inflationLabel = "Inflation Rate";
  inflationLabelRu = "Инфляция";

  unemploymentLabel = "Unemployment Rate";
  unemploymentLabelRu = "Безработица";


  constructor(
    private countriesService: CountriesService,
  ) {
    countriesService.getCountriesInfo(this.countriesList).pipe().subscribe(data => {
      this.countries = data;
    },
      err => {
        if (err instanceof HttpErrorResponse) {

          if (err.status === 422) {
            this.serverErrors = err.error.message
          }
        }
      })
    var language = localStorage.getItem('language');
    if (language == 'ru') {
      this.countryMap.set( "usd", "США");
      this.countryMap.set("gbp","Великобритания");
      this.countryMap.set("eur", "ЕС" );
      this.countryMap.set("jpy","Япония");
      this.countryMap.set("cad", "Канада");
      this.countryMap.set( "nzd", "Новая Зеландия",);
      this.countryMap.set("chf", "Швейцария");
      this.countryMap.set("aud", "Австралия");
      this.tableTitle = this.tableTitleRu;
      this.countryLabel = this.countryLabelRu;
      this.gdpLabel = this.gdpLabelRu;
      this.interestRateLabel = this.interestRateLabelRu;
      this.inflationLabel = this.inflationLabelRu;
      this.unemploymentLabel = this.unemploymentLabelRu;
    }
    else {
      this.countryMap.set("usd", "USA");
      this.countryMap.set("gbp","United Kingdom");
      this.countryMap.set("eur", "Eurpean Union");
      this.countryMap.set("jpy", "Japan");
      this.countryMap.set("cad", "Canada");
      this.countryMap.set("nzd", "New Zeland");
      this.countryMap.set("chf", "Swtizerland");
      this.countryMap.set("aud", "Australia");
    }
  }
}
