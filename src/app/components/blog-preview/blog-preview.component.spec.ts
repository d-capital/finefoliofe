import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BlogPreviewComponent } from './blog-preview.component';
import { ArticleService } from '../../services/article.service';
import { BrowserStorageService } from '../../services/browser-storage.service';

describe('BlogPreviewComponent', () => {
  let component: BlogPreviewComponent;
  let fixture: ComponentFixture<BlogPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPreviewComponent],
      providers: [
        { provide: BrowserStorageService, useValue: { getItem: () => 'ru' } },
        {
          provide: ArticleService,
          useValue: {
            getTopArticles: () => of([
              {
                id: 1,
                urlName: 'metod-dcf',
                language: 'ru',
                title: 'Оцениваем акции методом DCF',
                excerpt: 'Учитываем свободные денежные потоки.'
              },
              {
                id: 2,
                urlName: 'dcf-implementation',
                language: 'en',
                title: 'DCF Implementation',
                excerpt: 'Accounting for free cash flow.'
              }
            ])
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPreviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('loads localized articles and links to their article routes', () => {
    fixture.detectChanges();

    expect(component.posts).toEqual([{
      title: 'Оцениваем акции методом DCF',
      excerpt: 'Учитываем свободные денежные потоки.',
      link: 'article/metod-dcf'
    }]);
  });
});
