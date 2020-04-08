import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfectionWarningPage } from './infection-warning.page';

const routes: Routes = [
  {
    path: '',
    component: InfectionWarningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfectionWarningPageRoutingModule {}
