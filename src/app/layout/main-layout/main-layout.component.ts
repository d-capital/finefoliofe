import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent,FooterComponent,RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const lang = localStorage.getItem('language');
    if (lang === 'ru' && window.location.pathname === '/') {
      this.router.navigate(['/ru']);
    }
  }
}
