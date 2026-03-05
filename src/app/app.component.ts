import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
  constructor(
  ) {
    console.log(navigator.language)
    var isUserLangSet = localStorage.getItem("isUserLangSet");
    if (isUserLangSet !== "yes") {
      if (navigator.language == "ru" || navigator.language == "ru-RU") {
        localStorage.setItem("language", "ru");
      }
      else {
        localStorage.setItem("language", "en");
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
