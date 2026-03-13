import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'app-hero',
  imports: [RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {

  title:string = "Smarter Stock Valuations";
  subtitle:string = "Gain instant insights into your investments with our Peter Lynch like valuation tools.";
  button: string = "Start Valuation";
  buttonScreener:string = "Use Screener";

  titleRu: string = "Метод Питера Линча";
  subtitleRu: string = "Инвестируй, как Питер Линч. Узнай справедливую стоимость акции по формуле Питера Линча. Перед тем как покупать или продавать акцию выясни оценки недооцененности или переоцененности, потенциал роста или снижения, чтобы принимать разумные инвестиционные решения";
  buttonRu: string = "Начать Оценку";
  buttonScreenerRu: string  = "Cкриннер";
  
  titleEn: string = "Smarter Stock Valuations";
  subtitleEn: string = "Gain instant insights into your investments with our Peter Lynch like valuation tools.";
  buttonEn: string = "Start Valuation";
  buttonScreenerEn: string  = "Use Screener";

  constructor(private browserStorageService: BrowserStorageService) {}

  ngOnInit(): void {
    var language = this.browserStorageService.getItem('language');
    if(language == 'ru'){
      this.title = this.titleRu;
      this.subtitle = this.subtitleRu;
      this.button = this.buttonRu;
      this.buttonScreener = this.buttonScreenerRu;
    }
    else{
      this.title = this.titleEn;
      this.subtitle = this.subtitleEn;
      this.button = this.buttonEn;
      this.buttonScreener = this.buttonScreenerEn;
    }
  }
}
