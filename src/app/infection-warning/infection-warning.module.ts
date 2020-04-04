import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfectionWarningPageRoutingModule } from './infection-warning-routing.module';

import { InfectionWarningPage } from './infection-warning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfectionWarningPageRoutingModule
  ],
  declarations: [InfectionWarningPage]
})
export class InfectionWarningPageModule {}
