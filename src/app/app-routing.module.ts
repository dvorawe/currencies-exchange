import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ExchangeComponent } from './exchange/exchange.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'exchange', component: ExchangeComponent },
  { path: '', redirectTo: '/exchange', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
