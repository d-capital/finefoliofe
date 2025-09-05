import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{
  // Hero
  heroTitle = "";
  heroSubtitle = "";

  // Vision
  visionTitle = "";
  visionText = "";

  // Mission
  missionTitle = "";
  missionText = "";

  ngOnInit(): void {
    const lang = localStorage.getItem("language");

    if (lang === "ru") {
      this.heroTitle = "О нас";
      this.heroSubtitle = "Мы создаем сервис для умных инвесторов";
      
      this.visionTitle = "Видение";
      this.visionText = "Сделать стоимостное инвестирование доступным каждому инвестору, независимо от уровня знаний и опыта.";

      this.missionTitle = "Миссия";
      this.missionText = "Предоставить простые и понятные инструменты оценки акций, чтобы помочь инвесторам принимать более взвешенные решения.";
    } else {
      this.heroTitle = "About Us";
      this.heroSubtitle = "We build tools for smarter investors";
      
      this.visionTitle = "Vision";
      this.visionText = "To make value investing accessible to every investor, regardless of knowledge or experience.";

      this.missionTitle = "Mission";
      this.missionText = "To provide simple and transparent valuation tools that help investors make informed decisions.";
    }
  }
}
