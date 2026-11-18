import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { of } from 'rxjs';

import { ArticleComponent } from './article.component';
import { Article, ArticleService } from '../../services/article.service';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let articleService: jasmine.SpyObj<ArticleService>;
  let titleService: jasmine.SpyObj<Title>;
  let metaService: jasmine.SpyObj<Meta>;
  const article: Article = {
    id: 1,
    urlName: 'metod-dcf',
    language: 'ru',
    title: 'Оцениваем акции методом DCF',
    excerpt: 'Учитываем свободные денежные потоки.',
    metaTitle: 'Оценка акций методом DCF: формула, расчет и примеры',
    metaDescription: 'Разбираем, как рассчитать справедливую стоимость акций методом DCF.',
    content: '<p>Article body</p>',
    publishedAt: '31.10.2026'
  };

  beforeEach(async () => {
    articleService = jasmine.createSpyObj<ArticleService>('ArticleService', ['getArticle']);
    articleService.getArticle.and.returnValue(of(article));
    titleService = jasmine.createSpyObj<Title>('Title', ['setTitle']);
    metaService = jasmine.createSpyObj<Meta>('Meta', ['updateTag']);

    await TestBed.configureTestingModule({
      imports: [ArticleComponent],
      providers: [
        { provide: ArticleService, useValue: articleService },
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: 'metod-dcf' })) } },
        { provide: Title, useValue: titleService },
        { provide: Meta, useValue: metaService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads article content and applies its SEO metadata', () => {
    expect(articleService.getArticle).toHaveBeenCalledWith('metod-dcf');
    expect(component.content).toBe(article.content);
    expect(titleService.setTitle).toHaveBeenCalledWith(article.metaTitle);
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: article.metaDescription
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      property: 'og:title',
      content: article.metaTitle
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      property: 'og:description',
      content: article.metaDescription
    });
  });
});
