import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterAddressPage } from './register-address.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterAddressPageRoutingModule {}
