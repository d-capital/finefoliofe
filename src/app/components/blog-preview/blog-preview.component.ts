import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';


interface BlogPost {
  title: string;
  image: string;
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
  ngOnInit(): void {
    const lang = localStorage.getItem("language");
    if (lang === "ru") {
      this.title = "Блог";
      this.seeAll = "Смотреть все статьи";
      this.posts = [
        { 
          title: "Что такое стоимостное инвестирование?", 
          excerpt: "Погружаемся в основы стоимостного инвестирования.", 
          image:"blog-preview/whatisvalueinvesting.png",
          link: "/blog/lynch-model" },
        { 
          title: "Что такое GARP инвестирование по Питеру Линчу?", 
          excerpt: "Простые шаги для начинающего инвестора.", 
          image:"blog-preview/garp.png",
          link: "/blog/undervalued-stocks" 
        },
        { 
          title: "Что такое PEG?", 
          excerpt: "Понимая метрики роста компании.", 
          image:"blog-preview/peg.png",
          link: "/blog/undervalued-stocks" 
        }

      ];
    } else {
      this.title = "Blog";
      this.seeAll = "See all articles";
      this.posts = [
        { 
          title: "What is value investing?", 
          excerpt: "Deep dive into value investing", 
          image:"blog-preview/whatisvalueinvesting.png",
          link: "/blog/lynch-model" },
        { 
          title: "What is GARP investing according to Peter Lynch?", 
          excerpt: "Simple steps for beginner investors.", 
          image:"blog-preview/garp.png",
          link: "/blog/undervalued-stocks" },
        { 
          
          title: "What is PEG?", 
          excerpt: "Understanding growth measures.", 
          image:"blog-preview/peg.png",
          link: "/blog/undervalued-stocks" 
        }
      ];
    }
  }
}
