import { Component, OnInit, Injectable, Inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
@Injectable({ providedIn: 'root' })
export class AppComponent implements OnInit {
  title = 'finefolio-fe';
  isAlive:boolean = false;
  constructor(private route:ActivatedRoute, @Inject(DOCUMENT) private document: Document
  ) {
    console.log(navigator.language)
    const urlLang = window.location.href.split('/')[3]; 
    var isUserLangSet = localStorage.getItem("isUserLangSet");
    var localStorageLang = localStorage.getItem("language"); 
    if (isUserLangSet !== "yes") {
      
      if (navigator.language == "ru" || navigator.language == "ru-RU") {
        localStorage.setItem("language", "ru");
        localStorage.setItem("isUserLangSet", "yes")
      }
      else {
        localStorage.setItem("isUserLangSet", "yes")
        localStorage.setItem("language", urlLang);
      }
    }else{
      if(urlLang !== localStorage.getItem("language") && urlLang !==""){
        localStorage.setItem("language", urlLang);
        localStorage.setItem("isUserLangSet", "yes")
      }else if(urlLang === "" && (localStorageLang === "ru"|| localStorageLang === "en")){
        localStorage.setItem("language", localStorageLang);
        localStorage.setItem("isUserLangSet", "yes")
      }else{
        localStorage.setItem("language", "en");
        localStorage.setItem("isUserLangSet", "yes")
      }
    }
  }
  ngOnInit(): void {
    this.reloadLayout();
    this.addCanonicalLink('https://valestor.com/');
  }

  reloadLayout() {
    this.isAlive = false;
    setTimeout(() => this.isAlive = true, 1);
  }

  addCanonicalLink(url: string): void {
      if(document.querySelectorAll("link[rel='canonical']").length === 0){
        const link: HTMLLinkElement = this.document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', url);
        this.document.head.appendChild(link);
      }
  };
}
