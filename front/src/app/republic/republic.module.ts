import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 

import { IonicModule } from '@ionic/angular';

import { RepublicPageRoutingModule } from './republic-routing.module';

import { RepublicPage } from './republic.page';

/* COMPONENTES */
import { CommentComponent } from '../components/comment/comment.component';
import { CardRepublicComponent } from '../components/card-republic/card-republic.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RepublicPageRoutingModule
  ],
  declarations: [RepublicPage, CommentComponent, CardRepublicComponent]
})
export class RepublicPageModule {}
