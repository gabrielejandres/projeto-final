import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogPageRoutingModule } from './catalog-routing.module';

import { CatalogPage } from './catalog.page';

/* COMPONENTES */
import { CardCatalogComponent } from '../components/card-catalog/card-catalog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogPageRoutingModule
  ],
  declarations: [CatalogPage, CardCatalogComponent]
})
export class CatalogPageModule {}
