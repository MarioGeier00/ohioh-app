import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DataProtectionPage} from './data-protection.page';

const routes: Routes = [
  {
    path: '',
    component: DataProtectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataProtectionPageRoutingModule {}
