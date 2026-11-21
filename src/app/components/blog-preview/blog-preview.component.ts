import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticleService } from '../../services/article.service';
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

  constructor(
    private browserStorageService: BrowserStorageService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const lang = this.browserStorageService.getItem("language") ?? "en";
    if (lang === "ru") {
      this.title = "Блог";
      this.seeAll = "Смотреть все статьи";
    } 
    else if(lang === "es"){
      this.title = "Blog";
      this.seeAll = "Ver todos los artículos";
    }
    else {
      this.title = "Blog";
      this.seeAll = "See all articles";
    }

    this.articleService.getTopArticles().subscribe({
      next: articles => {
        this.posts = articles
          .filter(article => article.language === lang)
          .map(article => ({
            title: article.title,
            excerpt: article.excerpt,
            link: `article/${article.urlName}`
          }));
      },
      error: error => console.error('Failed to load blog preview articles:', error)
    });
  }
}
