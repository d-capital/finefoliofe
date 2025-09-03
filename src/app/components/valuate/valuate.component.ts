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
    // 🔹 Mocked example data — replace with API call later
    this.stockInfo = {
      name: 'NVIDIA Corporation',
      ticker: tickerCode ?? 'NVDA',
      exchange: exchangeCode ?? 'NASDAQ',
      price: 485.15,
      country: 'USA',
      capitalization: '1.2T',
      sector: 'Technology',
      industry: 'Semiconductors',
      epsTtm: 7.25,
      peTtm: 67,
      dividendYield: 0.05,
    };

    this.valuation = {
      fairPrice: 410,
      resultPercent: -15.5,
      resultLabel: 'Overvalued',
      formula: 'Fair Price = EPS * (8.5 + 2g)',
      explanation:
        'The Lynch formula estimates fair value using earnings per share (EPS) and expected growth rate (g).',
      netProfitHistory: [
        { year: '2019', value: 4000 },
        { year: '2020', value: 5500 },
        { year: '2021', value: 6200 },
        { year: '2022', value: 7900 },
        { year: '2023', value: 9200 },
      ],
      avgGrowth: {
        ttm: 12.5,
        threeYears: 10.2,
        fiveYears: 11.8,
      },
    };
    this.loading = false;
  }
}
