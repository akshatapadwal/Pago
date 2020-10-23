import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DefaultLayoutComponent} from './container/default-layout/default-layout.component';
import {LoginLayoutComponent} from './container/login-layout/login-layout.component';

const routes: Routes = [
  {path: '', component: LoginLayoutComponent},

  {
    path: 'admin', component: DefaultLayoutComponent, children: [
      {path: '', loadChildren: './views/dashboard/dashboard.module#DashboardModule'},
      {path: 'setting', loadChildren: './views/quote/quote.module#QuoteModule'},
      {path: 'Activities', loadChildren: './views/products/products.module#ProductsModule'},
      {path: 'Profile', loadChildren: './views/contact/contact.module#ContactModule'},
      {path: 'Jobs', loadChildren: './views/opportunity/opportunity.module#OpportunityModule'}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
