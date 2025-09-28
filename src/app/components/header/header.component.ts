import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  menuOpen = false;

  navLinkValuateStockLabel: string = "Valuate Stock";
  navLinkScreenerLabel: string = "Screener";
  navLinkBlogLabel: string = "Blog";
  navLinkAboutLabel: string = "About Us";

  navLinkValuateStockLabelRu: string = "Оценить Акцию";
  navLinkValuateStockLabelEn: string = "Valuate Stock";

  navLinkScreenerLabelRu: string = "Скриннер";
  navLinkScreenerLabelEn: string = "Screener";

  navLinkBlogLabelRu: string = "Блог";
  navLinkBlogLabelEn: string = "Blog";

  navLinkAboutLabelRu: string = "О нас";
  navLinkAboutLabelEn: string = "About Us";

  quickLinksLabelRu: string = "Страницы";
  quickLinksLabelEn: string = "Quick Links";

  selectedValue!: string|null;
  selectedLanguage!: string|undefined;
  langMap = new Map<string, string>();
  constructor(){
    this.langMap.set("en", "EN");
    this.langMap.set("ru", "RU");
  }

  ngOnInit(): void {
    this.selectedValue  = localStorage.getItem("language") ? localStorage.getItem("language"):"en";
    var langCode = this.selectedValue ? this.selectedValue.toString() : "en";
    this.selectedLanguage = this.langMap.get(langCode);
    var language = localStorage.getItem('language');
    if(language == 'ru'){
      this.navLinkValuateStockLabel = this.navLinkValuateStockLabelRu;
      this.navLinkBlogLabel = this.navLinkBlogLabelRu;
      this.navLinkAboutLabel = this.navLinkAboutLabelRu;
      this.navLinkScreenerLabel = this.navLinkScreenerLabelRu;
    }
    else{
      this.navLinkValuateStockLabel = this.navLinkValuateStockLabelEn;
      this.navLinkBlogLabel = this.navLinkBlogLabelEn;
      this.navLinkAboutLabel = this.navLinkAboutLabelEn;
      this.navLinkScreenerLabel = this.navLinkScreenerLabelEn;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  onSelectionChange(newValue: string) {
    this.selectedValue = newValue;
    console.log('Selected value:', this.selectedValue);
    localStorage.setItem("language",this.selectedValue);
    localStorage.setItem("isUserLangSet","yes");
    window.location.reload();
  }

}