import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'app-news',
  imports: [NgFor, NgIf],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  public news: any;
  serverErrors=[];
  constructor(
    private newsApiService: NewsService,
    private browserStorageService: BrowserStorageService
  ) { }

  ngOnInit() {
    var language = this.browserStorageService.getItem('language');
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