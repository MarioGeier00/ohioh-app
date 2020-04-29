import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeolocationTestPage } from './geolocation-test.page';

const routes: Routes = [
  {
    path: '',
    component: GeolocationTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeolocationTestPageRoutingModule {}
