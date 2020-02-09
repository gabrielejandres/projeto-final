import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 

import { IonicModule } from '@ionic/angular';

import { RepublicPageRoutingModule } from './republic-routing.module';

import { RepublicPage } from './republic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RepublicPageRoutingModule
  ],
  declarations: [RepublicPage]
})
export class RepublicPageModule {}
