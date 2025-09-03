import { CommonModule, NgFor } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockInfo } from '../../dto/valuation/stock-info.model';
import { ValuationResult } from '../../dto/valuation/valuation.model';
import { ValuationService } from '../../services/valuation.service';

@Component({
  selector: 'app-valuate',
  imports: [NgFor,CommonModule],
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
  serverErrors = [];
  ticker: string = 'AAPL';
  exchange: string = 'NYSE'
  loadingLabel = 'Loading valuation data...';
  ngOnInit(): void {
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
        if (err instanceof HttpErrorResponse) {

          if (err.status === 422) {
            this.serverErrors = err.error.message
          }
        }
      }
    )

  }
}
