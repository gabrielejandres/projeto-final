import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { BrMaskerModule } from 'br-mask';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterRepublicPageRoutingModule } from './register-republic-routing.module';

import { RegisterRepublicPage } from './register-republic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    IonicModule,
    RegisterRepublicPageRoutingModule,
    BrMaskerModule
  ],
  declarations: [RegisterRepublicPage]
})
export class RegisterRepublicPageModule {}
