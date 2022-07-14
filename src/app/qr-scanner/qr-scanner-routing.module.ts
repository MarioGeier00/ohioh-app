import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {QrScannerPage} from './qr-scanner.page';

const routes: Routes = [
  {
    path: '',
    component: QrScannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrScannerPageRoutingModule {}
