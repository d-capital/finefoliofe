import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';


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

  titleRu: string = "Умная Оценка Акций";
  subtitleRu: string = "Получите мгновенную информацию о своих инвестициях с помощью наших инструментов оценки, на основе методов Питера Линча.";
  buttonRu: string = "Начать Оценку";
  
  titleEn: string = "Smarter Stock Valuations";
  subtitleEn: string = "Gain instant insights into your investments with our Peter Lynch like valuation tools.";
  buttonEn: string = "Start Valuation";

  ngOnInit(): void {
    var language = localStorage.getItem('language');
    if(language == 'ru'){
      this.title = this.titleRu;
      this.subtitle = this.subtitleRu;
      this.button = this.buttonRu;
    }
    else{
      this.title = this.titleEn;
      this.subtitle = this.subtitleEn;
      this.button = this.buttonEn;
    }
  }
}
