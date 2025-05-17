import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as articlesList from '../articlelist/articles.json'

@Component({
  selector: 'app-article',
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
    id = '1'; 
    title = "";
    content = "";
    article:any;
    articles:any;
    constructor(private http: HttpClient, private route: ActivatedRoute) {
      const artid = this.route.snapshot.paramMap.get('id');
      this.id = artid ? artid: '1';
      this.articles = articlesList['articles'];
      this.fetchArticle(this.id);
    }
  fetchArticle(id:string) {
    this.article = this.articles.find((a: any) => a.id === id);
    this.title = this.article["title"];
    this.content = this.article["content"];
  }

}
