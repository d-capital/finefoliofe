import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'finefolio-fe';
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
}
