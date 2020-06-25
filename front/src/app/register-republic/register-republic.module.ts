import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { BrMaskerModule } from 'br-mask';
import { RouterModule } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx'; //UPLOAD FILES

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
    BrMaskerModule,
    RouterModule
  ],
  declarations: [RegisterRepublicPage],
  providers: [Camera] //UPLOAD FILES
})
export class RegisterRepublicPageModule {}
