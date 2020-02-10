import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 

import { IonicModule } from '@ionic/angular';

import { RegisterAddressPageRoutingModule } from './register-address-routing.module';

import { RegisterAddressPage } from './register-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterAddressPageRoutingModule
  ],
  declarations: [RegisterAddressPage]
})
export class RegisterAddressPageModule {}
