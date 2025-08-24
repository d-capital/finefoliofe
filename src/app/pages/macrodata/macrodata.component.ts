import { Component } from '@angular/core';
import { MacroDataService } from '../../services/macrodata.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-macrodata',
  imports: [CommonModule, NgFor],
  templateUrl: './macrodata.component.html',
  styleUrl: './macrodata.component.css'
})
export class MacrodataComponent {
  event: string = 'inflation';
  country: string = 'usd';
  serverErrors = [];
  macroEvents: any[] = [];
  eventMap = new Map<string, string>();
  countryMap = new Map<string,string>();
  eventCodeMap = new Map<string,string>();
  countryToShow?: string = "US";
  eventToShow?: string = "Inflation Rate";
  eventCode: string = 'inf';

  dateLabel:string = "Date";
  actualLabel:string = "Actual";
  forecastedLabel:string = "Forecasted";
  exportButtonLabel:string = "Export to CSV";

  dateLabelRu:string = "Дата";
  actualLabelRu:string = "Факт";
  forecastedLabelRu:string = "Прогноз";
  exportButtonLabelRu:string = "Скачать CSV";

  dateLabelEn:string = "Date";
  actualLabelEn:string = "Actual";
  forecastedLabelEn:string = "Forecasted";
  exportButtonLabelEn:string = "Export to CSV";


  constructor(
    private MacroDataServiceApi: MacroDataService,
    private route: ActivatedRoute
  ) {

    var language = localStorage.getItem('language');
    if(language == 'ru'){
      this.eventMap.set("gdp","Рост ВВП");
      this.eventMap.set("unemployment","Безработица");
      this.eventMap.set("interestrate","Ставка");
      this.eventMap.set("inflation","Инфляция");

      this.eventCodeMap.set("gdp","gdp");
      this.eventCodeMap.set("unemployment", "une");
      this.eventCodeMap.set("interestrate","ir");
      this.eventCodeMap.set("inflation", "inf");

      this.countryMap.set("usd","США");
      this.countryMap.set("gbp","Великобритания");
      this.countryMap.set("eur","ЕС");
      this.countryMap.set("jpy","Япония");
      this.countryMap.set("cad","Канада");
      this.countryMap.set("nzd","Новая Зеландия");
      this.countryMap.set("chf","Швейцария");
      this.countryMap.set("aud","Австралия");

      this.dateLabel = this.dateLabelRu;
      this.actualLabel = this.actualLabelRu;
      this.forecastedLabel = this.forecastedLabelRu;
      this.exportButtonLabel = this.exportButtonLabelRu;
    }
    else{
      this.eventMap.set("gdp","GDP Growth Rate");
      this.eventMap.set("unemployment","Unemployment Rate");
      this.eventMap.set("interestrate","Interest Rate");
      this.eventMap.set("inflation","Inflation Rate");

      this.eventCodeMap.set("gdp","gdp");
      this.eventCodeMap.set("unemployment", "une");
      this.eventCodeMap.set("interestrate","ir");
      this.eventCodeMap.set("inflation", "inf");

      this.countryMap.set("usd","US");
      this.countryMap.set("gbp","UK");
      this.countryMap.set("eur","EU");
      this.countryMap.set("jpy","Japan");
      this.countryMap.set("cad","Canada");
      this.countryMap.set("nzd","New Zeland");
      this.countryMap.set("chf","Swtizerland");
      this.countryMap.set("aud","Australia");

      this.dateLabel = this.dateLabelEn;
      this.actualLabel = this.actualLabelEn;
      this.forecastedLabel = this.forecastedLabelEn;
      this.exportButtonLabel = this.exportButtonLabelEn;
    }

   }

  ngOnInit(): void {
    const event = this.route.snapshot.paramMap.get('event');
    this.event = event ? event : 'inflation';
    const country = this.route.snapshot.paramMap.get('country');
    this.country = country ? country : 'usd';
    this.countryToShow = this.countryMap.get(this.country) ? this.countryMap.get(this.country) : "US";
    this.eventToShow = this.eventMap.get(this.event) ? this.eventMap.get(this.event) : "Inflation";
    this.eventCode = this.eventCodeMap.get(this.event)! ? this.eventCodeMap.get(this.event)! : "inf"!;
    this.MacroDataServiceApi.getMacroData(this.eventCode, this.country).pipe().subscribe(data => {
      this.macroEvents = data.sort((a: any, b: any) => b.id - a.id);
      this.macroEvents.forEach(element => {
        const unixTimestamp = element.dateline;
        const date = new Date(unixTimestamp * 1000);
        element.date = date.toLocaleDateString();
        
      });
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

  exportTableToCSV(): void {
    const table = document.getElementById('myTable');
    const rows = Array.from(table?.querySelectorAll('tr') || []);
    const csv: string[] = [];

    for (const row of rows) {
      const cols = Array.from(row.querySelectorAll('th, td'));
      const rowData = cols.map(col => `"${(col as HTMLElement).innerText.replace(/"/g, '""')}"`);
      csv.push(rowData.join(','));
    }

    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'table.csv');
    link.click();
  }

}
