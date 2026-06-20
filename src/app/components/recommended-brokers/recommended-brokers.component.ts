import { CommonModule, NgFor } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

interface BrokerLink {
  name: string;
  url: string;
  description: string;
  logo: string;
}

@Component({
  selector: 'app-recommended-brokers',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './recommended-brokers.component.html',
  styleUrls: ['./recommended-brokers.component.css']
})
export class RecommendedBrokersComponent implements OnInit, OnChanges {
  @Input() language: string = '';
  @ViewChild('track', { static: false }) track?: ElementRef<HTMLDivElement>;

  title = 'Buy from a broker';
  titleRu = 'Купить у брокера';
  titleEs = 'Comprar de un corredor';
  brokers: BrokerLink[] = [];

  private moexBrokers: BrokerLink[] = [
    {
      name: 'Т-инвестиции',
      url: 'https://www.tinkoff.ru/invest/',
      description: '',
      logo: 'brokers/ru/ti.png'
    },
    {
      name: 'БКС',
      url: 'https://www.bcs.ru/',
      description: '',
      logo: 'brokers/ru/bc.png'
    },
    {
      name: 'Финам',
      url: 'https://www.finam.ru/',
      description: '',
      logo: 'brokers/ru/fi.png'
    },
    {
      name: 'Альфа-инвестиции',
      url: 'https://alfabank.ru/make-money/investments/invest-online/',
      description: '',
      logo: 'brokers/ru/ai.png'
    }
  ];

  private internationalBrokers: BrokerLink[] = [
    {
      name: 'Interactive Brokers',
      url: 'https://www.interactivebrokers.com/',
      description: '',
      logo: 'brokers/en/ib.png'
    },
    {
      name: 'eToro',
      url: 'https://www.etoro.com/',
      description: '',
      logo: 'brokers/en/et.jpg'
    },
    {
      name: 'Robinhood',
      url: 'https://robinhood.com/',
      description: '',
      logo: 'brokers/en/rh.png'
    },
    {
      name: 'Charles Schwab',
      url: 'https://www.schwab.com/',
      description: '',
      logo: 'brokers/en/cs.png'
    }
  ];

  ngOnInit(): void {
    this.updateBrokers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exchange']) {
      this.updateBrokers();
    }
  }

  scroll(direction: number): void {
    if (!this.track?.nativeElement) {
      return;
    }

    const element = this.track.nativeElement;
    const offset = element.clientWidth * 0.8 * direction;
    element.scrollBy({ left: offset, behavior: 'smooth' });
  }

  private updateBrokers(): void {
    const language = this.language?.trim();
    if (language === 'ru') {
      this.brokers = this.moexBrokers;
    } else {
      this.brokers = this.internationalBrokers;
    }
    if (language === 'ru') {
      this.title = this.titleRu;
    } else if (language === 'es') {
      this.title = this.titleEs;
    }
  }
}
