import { Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { MacrodataComponent } from './pages/macrodata/macrodata.component';
import { ValuationComponent } from './pages/valuation/valuation.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'valuation', component: ValuationComponent },
    { path:'article/:id', component: ArticleComponent},
    { path:'exchange/:ticker', component: ExchangeComponent },
    { path:'macrodata/:event/:country', component: MacrodataComponent }
];
