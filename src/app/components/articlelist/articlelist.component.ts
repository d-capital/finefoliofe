import { NgFor, SlicePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as articlesList from './articles.json';

@Component({
  selector: 'app-articlelist',
  imports: [NgFor, SlicePipe],
  templateUrl: './articlelist.component.html',
  styleUrl: './articlelist.component.css'
})
export class ArticlelistComponent {

  articles: any[] = [{title:"title1",content:"<div>content1</div><b>hello</b>"},{title:"title2",content:"content2"}];
  newTitle = '';
  newContent = '';
  aiSuggestion = '';
  page = 1;
  pageSize = 5;
  totalPages = 1;
  pagedArticles:any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.articles = articlesList['articles'];
    this.totalPages = Math.ceil(this.articles.length / this.pageSize);
    this.fetchArticles();
  }
  fetchArticles() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedArticles = this.articles.slice(start, end);
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchArticles();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchArticles();
    }
  }

  public readArticle(event:any){
    let id:string = event.target.id; 
    this.router.navigate(["/article", id]);
  }
}
