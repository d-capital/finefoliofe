import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserStorageService } from '../../services/browser-storage.service';

interface BlogPost {
  title: string;
  excerpt: string;
  link: string;
}

@Component({
  selector: 'app-blog-preview',
  imports: [RouterModule, NgFor],
  templateUrl: './blog-preview.component.html',
  styleUrl: './blog-preview.component.css'
})
export class BlogPreviewComponent implements OnInit{
  title = "";
  posts: BlogPost[] = [];
  seeAll = "";

  constructor(private browserStorageService: BrowserStorageService) {}

  ngOnInit(): void {
    const lang = this.browserStorageService.getItem("language");
    if (lang === "ru") {
      this.title = "Блог";
      this.seeAll = "Смотреть все статьи";
      this.posts = [
        {
          title:"Макроэкномический обзор: ноябрь 2026",
          excerpt:"Мировая экономика и финансовые рынки в ноябре 2026",
          link:"article/macro-obzor-nojabr-26"
        },
        {
          title: "Разбор акции NVDA", 
          excerpt: "Оцениваем акцию NVIDIA по методу Питера Линча.", 
          link: "article/nvda-obzor" 
        },
        {
          title: "Разбор акции MOEX", 
          excerpt: "Оцениваем акцию Мосбиржи по методу Питера Линча.", 
          link: "article/moex-review" 
        },
        {
          title: "Методология расчета DCF", 
          excerpt: "Учитываем свободные денежные потоки.", 
          link: "article/metod-dcf" 
        }

      ];
    } 
    else if(lang === "es"){
      this.title = "Blog";
      this.seeAll = "Ver todos los artículos";
      this.posts = [
        {
          title:"Análisis macroeconómico: noviembre de 2026",
          excerpt:"Economía global y mercados financieros",
          link:"article/revision-macroeconomica-noviembre-26"
        },
        {
          title: "Análisis de las acciones de NVDA", 
          excerpt: "Valoración de las acciones de NVIDIA mediante el método de Peter Lynch.", 
          link: "article/analisis-de-nvda" 
        },
        {
          title: "Implementación del DCF", 
          excerpt: "Contabilización del flujo de caja libre.", 
          link: "article/dcf-metodo" 
        }

      ];
    }
    else {
      this.title = "Blog";
      this.seeAll = "See all articles";
      this.posts = [
        {
          title:"Macroeconomic Overview: November 2026",
          excerpt:"Global Economy and Financial Markets in November 2026",
          link:"article/macro-review-november-26"
        },
        {
          title: "NVIDIA Stock Review", 
          excerpt: "Evaluating the NVIDIA stock using Peter Lynch's method.", 
          link: "article/nvda-review" 
        },
        {
          title: "DCF Implementation", 
          excerpt: "Accounting for free cash flow.", 
          link: "article/dcf-implementation" 
        }

      ];
    }
  }
}
