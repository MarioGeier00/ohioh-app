import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {QrGeneratorPage} from './qr-generator.page';
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';

const routes: Routes = [
  {
    path: '',
    component: QrGeneratorPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NgxQRCodeModule
  ],
  exports: [RouterModule],
})
export class QrGeneratorPageRoutingModule {
}
