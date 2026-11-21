import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, isDevMode, PLATFORM_ID } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

export interface ArticleSummary {
  id: number;
  urlName: string;
  language: string;
  title: string;
  excerpt: string;
}

export interface Article extends ArticleSummary {
  metaTitle: string;
  metaDescription: string;
  content: string;
  publishedAt: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  getTopArticles(): Observable<ArticleSummary[]> {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) {
      return EMPTY;
    }

    return this.http.get<ArticleSummary[]>(`${apiUrl}top`);
  }

  getArticle(urlName: string): Observable<Article> {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) {
      return EMPTY;
    }

    return this.http.get<Article>(`${apiUrl}${encodeURIComponent(urlName)}`);
  }

  private getApiUrl(): string | null {
    if (isPlatformServer(this.platformId)) {
      return isDevMode() ? null : 'http://finefolionet:8080/article/';
    }

    return isPlatformBrowser(this.platformId)
      ? isDevMode()
        ? 'https://localhost:64662/article/'
        : 'https://valestor.com/api/article/'
      : null;
  }
}
