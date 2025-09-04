import { NgIf } from '@angular/common';
import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-state',
  imports: [NgIf],
  templateUrl: './error-state.component.html',
  styleUrl: './error-state.component.css'
})
export class ErrorStateComponent implements OnInit {
  @Input() showHomeButton: boolean = true;
  message: string = "Seems like our data sources (tradingview, yfinance, SEC) are not responding!";
  messageRu: string = "Кажется наши источники данных (tradingview, yfinance, SEC) не отвечают!";
  messageEn: string = "Seems like our data sources (tradingview, yfinance, SEC) are not responding!";

  retryLabel: string = "Retry";
  retryLableRu: string = "Обновить";
  retryLableEn: string = "Retry";

  goHomeLabel: string = "Go Home";
  goHomeLabelRu: string = "На Главную";
  goHomeLabelEn: string = "Go Home";

  oopsLabel: string  = "Oops!";
  oopsLabelRu: string  = "Ох!";
  oopsLabelEn: string  = "Oops!";


  constructor(private router: Router) {}

  ngOnInit(): void {
    var language = localStorage.getItem('language');
    if(language == 'ru'){
      this.message = this.messageRu;
      this.retryLabel = this.retryLableRu;
      this.goHomeLabel = this.goHomeLabelRu;
      this.oopsLabel = this.oopsLabelRu;
    }
    else{
      this.message = this.messageEn;
      this.retryLabel = this.retryLableEn;
      this.goHomeLabel = this.goHomeLabelEn;
      this.oopsLabel = this.oopsLabelEn;
    }
  }
  goHome() {
    this.router.navigate(['/']);
  }
  reload(){
    window.location.reload();
  }
}
