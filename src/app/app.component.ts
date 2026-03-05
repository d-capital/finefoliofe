import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent implements OnInit {
  title = 'finefolio-fe';
  isAlive:boolean = false;
  constructor(private route:ActivatedRoute
  ) {
    console.log(navigator.language)
    const urlLang = window.location.href.split('/')[3]; 
    var isUserLangSet = localStorage.getItem("isUserLangSet");
    
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
      if(urlLang !== localStorage.getItem("language")){
        localStorage.setItem("language", urlLang);
        localStorage.setItem("isUserLangSet", "yes")
      }
    }
  }
  ngOnInit(): void {
    this.reloadLayout();
  }

  reloadLayout() {
    this.isAlive = false;
    setTimeout(() => this.isAlive = true, 1);
  }
}
