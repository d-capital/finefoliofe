import { Component, OnInit, HostListener} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { NgIf } from '@angular/common';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { ActivatedRoute } from '@angular/router';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, SearchComponent, NgIf, LanguageSelectorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  menuOpen = false;

  navLinkValuateStockLabel: string = "Valuate Stock";
  navLinkScreenerLabel: string = "Screener";
  navLinkBlogLabel: string = "Blog";
  navLinkAboutLabel: string = "About Us";
  servicesLabel: string = "Services";
  searchLabel: string = "Search for a stock"

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

  servicesLabelEn: string = "Services";
  servicesLabelRu: string = "Сервисы";

  searchLabelEn: string = "Search"
  searchLabelRu: string = "Поиск"

  dropdownOpen = false;
  searchOpen = false;
  selectedValue: string | null = null;
  selectedLanguage!: string|undefined;
  pageLanguage: string = "en";
  langMap = new Map<string, string>();
  constructor(
    private router: Router,
    private browserStorageService: BrowserStorageService,
    private windowService: WindowService
  ){
    this.langMap.set("en", "en");
    this.langMap.set("ru", "ru");
  }

  ngOnInit(): void {
    this.selectedValue  = this.browserStorageService.getItem("language") || "en";
    this.pageLanguage = this.selectedValue ? this.selectedValue.toString() : "en";
    var langCode = this.selectedValue ? this.selectedValue.toString() : "en";
    this.selectedLanguage = this.langMap.get(langCode);
    var language = this.browserStorageService.getItem('language');
    if(language == 'ru'){
      this.navLinkValuateStockLabel = this.navLinkValuateStockLabelRu;
      this.navLinkBlogLabel = this.navLinkBlogLabelRu;
      this.navLinkAboutLabel = this.navLinkAboutLabelRu;
      this.navLinkScreenerLabel = this.navLinkScreenerLabelRu;
      this.servicesLabel = this.servicesLabelRu;
      this.searchLabel = this.searchLabelRu;
    }
    else{
      this.navLinkValuateStockLabel = this.navLinkValuateStockLabelEn;
      this.navLinkBlogLabel = this.navLinkBlogLabelEn;
      this.navLinkAboutLabel = this.navLinkAboutLabelEn;
      this.navLinkScreenerLabel = this.navLinkScreenerLabelEn;
      this.servicesLabel = this.servicesLabelEn;
      this.searchLabel = this.searchLabelEn;
    }
  }
  

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  onSelectionChange(newValue: string) {
    this.selectedValue = newValue;
    console.log('Selected value:', this.selectedValue);
    this.browserStorageService.setItem("language", this.selectedValue);
    this.browserStorageService.setItem("isUserLangSet", "yes");
    this.windowService.reload();
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.dropdownOpen = !this.dropdownOpen;
  }
  openValuation(){
    this.toggleMenu();
    this.router.navigate(["/valuation"]);
  }

  openScreener(){
    this.toggleMenu();
    this.router.navigate(["/screener"]);
  }

  toggleSearchPopup() {
    this.searchOpen = !this.searchOpen;
  }

  // ✅ ESC key handler
  @HostListener('document:keydown.escape', ['$event'])
  onEscKey(event: Event) {
    if (this.searchOpen) {
      this.searchOpen = false;
      event.stopPropagation();
    }
  }

}