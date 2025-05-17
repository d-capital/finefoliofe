import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../../services/exchange.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ExchangeInfo } from '../../dto/exchange-info/exchange-info.model';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-exchange',
  imports: [NgIf,CommonModule],
  templateUrl: './exchange.component.html',
  styleUrl: './exchange.component.css'
})
export class ExchangeComponent implements OnInit {
  ticker:string = '';
  serverErrors = []
  exchangeInfo: ExchangeInfo = {} as ExchangeInfo;
  loading = true;
  fields = [
  { label: 'Interest Rate (%)', first: 'first_currency_interest_rate', second: 'second_currency_interest_rate' },
  { label: 'Inflation Rate (%)', first: 'first_currency_inflation_rate', second: 'second_currency_inflation_rate' },
  { label: 'Unemployment Rate (%)', first: 'first_currency_unemployment_rate', second: 'second_currency_unemployment_rate' },
  { label: 'GDP Growth Rate (%)', first: 'first_currency_gdp_growth_rate', second: 'second_currency_gdp_growth_rate' },
];
  constructor(
    private ExchangeServiceApi: ExchangeService,
    private route: ActivatedRoute 
  ){}
  ngOnInit(): void {
    const tickerCode = this.route.snapshot.paramMap.get('ticker');
    this.ticker = tickerCode ? tickerCode: '1';
    this.ExchangeServiceApi.getExchangeInfo(this.ticker).pipe().subscribe(data =>{
      this.exchangeInfo = data;
      console.log(this.exchangeInfo);
      this.loading = false;
    },
    err=>{
        if (err instanceof HttpErrorResponse) {
          
          if (err.status === 422) {
            this.serverErrors = err.error.message
          }
        }
      }
    )
  }

}
