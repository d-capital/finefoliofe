import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { WindowService } from '../../services/window.service';

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
  navLinkValuateStockLabel: string = "Valuate Stock";
  navLinkBlogLabel: string = "Blog";
  navLinkAboutLabel: string = "About Us";
  quickLinksLabel: string = "Quick Links";
  navLinkScreenerLabel: string = "Screener";
  
  disclaimerRu: string = "Отказ от ответственности: Расчеты, представленные на этом сайте, носят информативный характер. Торговля на финансовых рынках связана с риском, который принимает на себя каждый участник самостоятельно. Пользуясь этим сайтом, вы подтверждаете, что были проинформированы.";
  disclaimerEn: string = "Disclaimer: Calculations provided by this site are informative.Trading on financial markets is connected with risk, which is taken by every participant on his own. Using this site you agree that you were informed.";

  navLinkHomeLabelRu: string = "Главная";
  navLinkHomeLabelEn: string = "Home";

  navLinkValuateStockLabelRu: string = "Оценить Акцию";
  navLinkValuateStockLabelEn: string = "Valuate Stock";

  navLinkBlogLabelRu: string = "Блог";
  navLinkBlogLabelEn: string = "Blog";

  navLinkAboutLabelRu: string = "О нас";
  navLinkAboutLabelEn: string = "About Us";

  quickLinksLabelRu: string = "Страницы";
  quickLinksLabelEn: string = "Quick Links";

  navLinkScreenerLabelRu: string = "Скриннер";
  navLinkScreenerLabelEn: string = "Screener";

  logo: string = "";
  logoRu: string = "logoru.png";
  logoEn: string = "logo.png";

  pageLanguage: string = "en";

  constructor(
    private browserStorageService: BrowserStorageService,
    private windowService: WindowService
  ){
     this.langMap.set("en", "English");
     this.langMap.set("ru", "Русский");
  }
  ngOnInit(): void {
    this.selectedValue  = this.browserStorageService.getItem("language") || "en";
    this.pageLanguage = this.selectedValue ? this.selectedValue.toString() : "en";
    var langCode = this.selectedValue ? this.selectedValue.toString() : "en";
    this.selectedLanguage = this.langMap.get(langCode);
    var language = this.browserStorageService.getItem('language');
    if(language == 'ru'){
      this.disclaimer = this.disclaimerRu;
      this.navLinkHomeLabel = this.navLinkHomeLabelRu;
      this.navLinkValuateStockLabel = this.navLinkValuateStockLabelRu;
      this.navLinkBlogLabel = this.navLinkBlogLabelRu;
      this.navLinkAboutLabel = this.navLinkAboutLabelRu;
      this.quickLinksLabel = this.quickLinksLabelRu;
      this.navLinkScreenerLabel = this.navLinkScreenerLabelRu;
      this.logo = this.logoRu;
    }
    else{
      this.disclaimer = this.disclaimerEn;
      this.navLinkHomeLabel = this.navLinkHomeLabelEn;
      this.navLinkValuateStockLabel = this.navLinkValuateStockLabelEn;
      this.navLinkBlogLabel = this.navLinkBlogLabelEn;
      this.navLinkAboutLabel = this.navLinkAboutLabelEn;
      this.quickLinksLabel = this.quickLinksLabelEn;
      this.navLinkScreenerLabel = this.navLinkScreenerLabelEn;
      this.logo = this.logoEn;
    }
  }

  onSelectionChange(newValue: string) {
    this.selectedValue = newValue;
    console.log('Selected value:', this.selectedValue);
    this.browserStorageService.setItem("language", this.selectedValue);
    this.browserStorageService.setItem("isUserLangSet", "yes");
    this.windowService.reload();
  }
}