import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-news',
  imports: [NgFor, NgIf],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  public news: any;
  serverErrors=[];
  constructor(
    private newsApiService: NewsService
  ) { }

  ngOnInit() {
    var language = localStorage.getItem('language');
    this.newsApiService.getNews().pipe().subscribe(data=>{
      if(language == 'ru'){
        this.news = data['news_ru'];
      }else{
        this.news = data['news'];
      }
      
    },err => { 
        const validationErrors = err.error;
        if (err instanceof HttpErrorResponse) {
          
          if (err.status === 422) {
            this.serverErrors = err.error.message
          }
      }
    });

}
}