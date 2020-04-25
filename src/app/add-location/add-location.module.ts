import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLocationPageRoutingModule } from './add-location-routing.module';

import { AddLocationPage } from './add-location.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddLocationPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [AddLocationPage]
})
export class AddLocationPageModule {}
