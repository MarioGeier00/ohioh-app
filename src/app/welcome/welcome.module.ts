import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePageRoutingModule } from './welcome-routing.module';

import { WelcomePage } from './welcome.page';
import { LanguageSelectorComponent } from '../shared/language-selector/language-selector.component';
import { LogoComponent } from '../shared/logo/logo.component';
import { LanguageFlagComponent } from '../shared/language-flag/language-flag.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [
    WelcomePage,
    LanguageFlagComponent,
    LanguageSelectorComponent,
    LogoComponent
  ]
})
export class WelcomePageModule { }
