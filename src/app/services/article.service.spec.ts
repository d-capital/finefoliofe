import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(ArticleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('fetches article details by URL name', () => {
    const article = {
      id: 1,
      urlName: 'metod-dcf',
      language: 'ru',
      title: 'Оцениваем акции методом DCF',
      excerpt: 'Учитываем свободные денежные потоки.',
      metaTitle: 'Оценка акций методом DCF',
      metaDescription: 'Описание статьи.',
      content: '<p>Article body</p>',
      publishedAt: '31.10.2026'
    };

    service.getArticle('metod-dcf').subscribe(response => {
      expect(response).toEqual(article);
    });

    const request = httpTestingController.expectOne('https://localhost:64662/article/metod-dcf');
    expect(request.request.method).toBe('GET');
    request.flush(article);
  });
});
