import { Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { MacrodataComponent } from './pages/macrodata/macrodata.component';
import { ValuationComponent } from './pages/valuation/valuation.component';
import { ValuateComponent } from './components/valuate/valuate.component';
import { AboutComponent } from './pages/about/about.component';
import { ScreenerComponent } from './pages/screener/screener.component';
import { ArticlelistComponent } from './components/articlelist/articlelist.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'valuation', component: ValuationComponent },
    { path: 'valuate/:exchange/:ticker', component:ValuateComponent},
    { path: 'screener', component:ScreenerComponent },
    { path:'about', component: AboutComponent },
    { path:'article/:id', component: ArticleComponent},
    { path:'exchange/:ticker', component: ExchangeComponent },
    { path:'macrodata/:event/:country', component: MacrodataComponent },
    { path:'articles', component:ArticlelistComponent }
];
