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
        /*{
          title: "Moex Stock Review", 
          excerpt: "Evaluating the MOEX stock using Peter Lynch's method.", 
          link: "article/moex-review" 
        },*/
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
        /*{
          title: "Moex Stock Review", 
          excerpt: "Evaluating the MOEX stock using Peter Lynch's method.", 
          link: "article/moex-review" 
        },*/
        {
          title: "DCF Implementation", 
          excerpt: "Accounting for free cash flow.", 
          link: "article/dcf-implementation" 
        }

      ];
    }
  }
}
