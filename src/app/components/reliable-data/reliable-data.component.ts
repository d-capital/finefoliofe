import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserStorageService } from '../../services/browser-storage.service';

interface ExchangeInfo {
  name: string;
  logo: string;
}

interface ReliableDataSource {
  logoUrl: string;
  sourceName: string;
  exchanges: ExchangeInfo[];
}

@Component({
  selector: 'app-reliable-data',
  imports: [NgFor],
  standalone: true,
  templateUrl: './reliable-data.component.html',
  styleUrls: ['./reliable-data.component.css']
})
export class ReliableDataComponent {
  title = 'Надежные источники данных';
  titleRu = 'Надежные источники данных';
  titleEn = 'Trusted Data Sources';
  constructor(private browserStorageService: BrowserStorageService) {}
  sources: ReliableDataSource[] = [
    {
      logoUrl: 'sec.png',
      sourceName: 'U.S. Securities & Exchange Commission (SEC)',
      exchanges: [
        { name: 'NYSE, NASDAQ', logo: 'exchanges/nyse.svg' }
      ]
    },
    {
      logoUrl: 'tradingviewlogo.png',
      sourceName: 'TradingView',
      exchanges: [
        { name: 'NYSE, NASDAQ', logo: 'exchanges/nyse.svg' }
      ]
    },
    {
      logoUrl: 'moexapi.png',
      sourceName: 'MOEX API',
      exchanges: [
        { name: 'MOEX', logo: 'exchanges/moex.svg' }
      ]
    }
  ];

  ngOnInit(): void {
    const lang = this.browserStorageService.getItem('language');
    if (lang === 'ru') {
      this.title = this.titleRu;
    } else {
      this.title = this.titleEn;
    }
  }
}

