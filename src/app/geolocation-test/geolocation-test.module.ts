import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeolocationTestPageRoutingModule } from './geolocation-test-routing.module';

import { GeolocationTestPage } from './geolocation-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeolocationTestPageRoutingModule
  ],
  declarations: [GeolocationTestPage]
})
export class GeolocationTestPageModule {}
