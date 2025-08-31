import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  menuOpen = false;

  navLinkValuateStockLabel: string = "Valuate Stock";
  navLinkBlogLabel: string = "Blog";
  navLinkAboutLabel: string = "About Us";

  navLinkValuateStockLabelRu: string = "Оценить Акцию";
  navLinkValuateStockLabelEn: string = "Valuate Stock";

  navLinkBlogLabelRu: string = "Блог";
  navLinkBlogLabelEn: string = "Blog";

  navLinkAboutLabelRu: string = "О нас";
  navLinkAboutLabelEn: string = "About Us";

  quickLinksLabelRu: string = "Страницы";
  quickLinksLabelEn: string = "Quick Links";

  ngOnInit(): void {
    var language = localStorage.getItem('language');
    if(language == 'ru'){
      this.navLinkValuateStockLabel = this.navLinkValuateStockLabelRu;
      this.navLinkBlogLabel = this.navLinkBlogLabelRu;
      this.navLinkAboutLabel = this.navLinkAboutLabelRu;
    }
    else{
      this.navLinkValuateStockLabel = this.navLinkValuateStockLabelEn;
      this.navLinkBlogLabel = this.navLinkBlogLabelEn;
      this.navLinkAboutLabel = this.navLinkAboutLabelEn;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}