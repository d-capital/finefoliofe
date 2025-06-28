import { Component, OnInit } from '@angular/core';
import { MacroDataService } from '../../services/macrodata.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-macrodata',
  imports: [NgIf, CommonModule, NgFor],
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
  countryToShow?: string = "US";
  eventToShow?: string = "Inflation Rate";
  constructor(
    private MacroDataServiceApi: MacroDataService,
    private route: ActivatedRoute
  ) {
    this.eventMap.set("gdp","GDP Growth Rate");
    this.eventMap.set("unemployment","Unemployment Rate");
    this.eventMap.set("interestrate","Interest Rate");
    this.eventMap.set("inflation","Inflation Rate");

    this.countryMap.set("usd","US");
    this.countryMap.set("gbp","UK");
    this.countryMap.set("eur","EU");
    this.countryMap.set("jpy","Japan");
    this.countryMap.set("cad","Canada");
    this.countryMap.set("nzd","New Zeland");
    this.countryMap.set("chf","Swtizerland");
    this.countryMap.set("aud","Australia");

   }

  ngOnInit(): void {
    const event = this.route.snapshot.paramMap.get('event');
    this.event = event ? event : 'inflation';
    const country = this.route.snapshot.paramMap.get('country');
    this.country = country ? country : 'usd';
    this.countryToShow = this.countryMap.get(this.country) ? this.countryMap.get(this.country) : "US";
    this.eventToShow = this.eventMap.get(this.event) ? this.eventMap.get(this.event) : "Inflation";
    this.MacroDataServiceApi.getMacroData(this.event, this.country).pipe().subscribe(data => {
      this.macroEvents = data.sort((a: any, b: any) => b.id - a.id);
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
