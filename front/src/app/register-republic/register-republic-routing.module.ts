import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterRepublicPage } from './register-republic.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterRepublicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRepublicPageRoutingModule {}
