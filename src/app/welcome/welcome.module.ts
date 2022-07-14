import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {WelcomePageRoutingModule} from './welcome-routing.module';

import {WelcomePage} from './welcome.page';
import {LogoComponent} from '../shared/logo/logo.component';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePageRoutingModule,
    TranslateModule.forChild(),
    SharedModule
  ],
  declarations: [
    WelcomePage,
    LogoComponent
  ]
})
export class WelcomePageModule { }
