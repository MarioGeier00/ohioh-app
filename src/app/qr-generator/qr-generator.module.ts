import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {QrGeneratorPageRoutingModule} from './qr-generator-routing.module';

import {QrGeneratorPage} from './qr-generator.page';
import {TranslateModule} from '@ngx-translate/core';
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    QrGeneratorPageRoutingModule,
    TranslateModule.forChild(),
    NgxQRCodeModule
  ],
  declarations: [QrGeneratorPage]
})
export class QrGeneratorPageModule {
}
