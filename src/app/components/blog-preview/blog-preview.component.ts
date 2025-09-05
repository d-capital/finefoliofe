import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';


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
  ngOnInit(): void {
    const lang = localStorage.getItem("language");
    if (lang === "ru") {
      this.title = "Блог";
      this.seeAll = "Смотреть все статьи";
      this.posts = [
        { title: "Что такое модель Питера Линча?", excerpt: "Погружаемся в основы стоимостного инвестирования.", link: "/blog/lynch-model" },
        { title: "Как выбрать недооценённые акции?", excerpt: "Простые шаги для начинающего инвестора.", link: "/blog/undervalued-stocks" }
      ];
    } else {
      this.title = "Blog";
      this.seeAll = "See all articles";
      this.posts = [
        { title: "What is the Peter Lynch Model?", excerpt: "Understanding the basics of value investing.", link: "/blog/lynch-model" },
        { title: "How to Spot Undervalued Stocks?", excerpt: "Simple steps for beginner investors.", link: "/blog/undervalued-stocks" }
      ];
    }
  }
}
