import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { EMPTY } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { Article, ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article',
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {
  title = '';
  content = '';
  publishedAt = '';
  article: Article | null = null;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter((urlName): urlName is string => urlName !== null),
      distinctUntilChanged(),
      switchMap(urlName => this.articleService.getArticle(urlName).pipe(
        catchError(error => {
          console.error('Failed to load article:', error);
          return EMPTY;
        })
      ))
    ).subscribe(article => {
      this.article = article;
      this.title = article.title;
      this.content = article.content;
      this.publishedAt = article.publishedAt ?? '';

      const metaTitle = article.metaTitle || article.title;
      const metaDescription = article.metaDescription || article.excerpt;
      this.titleService.setTitle(metaTitle);
      this.metaService.updateTag({ name: 'description', content: metaDescription });
      this.metaService.updateTag({ property: 'og:title', content: metaTitle });
      this.metaService.updateTag({ property: 'og:description', content: metaDescription });
    });
  }
}
