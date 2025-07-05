import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  selectedValue!: string|null;
  selectedLanguage!: string|undefined;
  langMap = new Map<string, string>();

  //localization
  disclaimer: string = "Disclaimer: Calculations provided by this site are informative.Trading on financial markets is connected with risk, which is taken by every participant on his own. Using this site you agree that you were informed.";
  navLinkHomeLabel: string = "Home";
  
  disclaimerRu: string = "Отказ от ответственности: Расчеты, представленные на этом сайте, носят информативный характер. Торговля на финансовых рынках связана с риском, который принимает на себя каждый участник самостоятельно. Пользуясь этим сайтом, вы подтверждаете, что были проинформированы.";
  disclaimerEn: string = "Disclaimer: Calculations provided by this site are informative.Trading on financial markets is connected with risk, which is taken by every participant on his own. Using this site you agree that you were informed.";

  navLinkHomeLabelRu: string = "Главная";
  navLinkHomeLabelEn: string = "Home";

  constructor(){
     this.langMap.set("en", "English");
     this.langMap.set("ru", "Русский");
  }
  ngOnInit(): void {
    this.selectedValue  = localStorage.getItem("language") ? localStorage.getItem("language"):"en";
    var langCode = this.selectedValue ? this.selectedValue.toString() : "en";
    this.selectedLanguage = this.langMap.get(langCode);
    var language = localStorage.getItem('language');
    if(language == 'ru'){
      this.disclaimer = this.disclaimerRu;
      this.navLinkHomeLabel = this.navLinkHomeLabelRu;
    }
    else{
      this.disclaimer = this.disclaimerEn;
      this.navLinkHomeLabel = this.navLinkHomeLabelEn;
    }
  }

  onSelectionChange(newValue: string) {
    this.selectedValue = newValue;
    console.log('Selected value:', this.selectedValue);
    localStorage.setItem("language",this.selectedValue);
    localStorage.setItem("isUserLangSet","yes");
    window.location.reload();
  }
}