import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent,FooterComponent,RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {
  constructor(
    private router: Router,
    private browserStorageService: BrowserStorageService,
    private windowService: WindowService
  ) {}

  ngOnInit(): void {
    const lang = this.browserStorageService.getItem('language');
    if (lang === 'ru' && this.windowService.pathname === '/') {
      this.router.navigate(['/ru']);
    }
  }
}
