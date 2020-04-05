import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePageRoutingModule } from './welcome-routing.module';

import { WelcomePage } from './welcome.page';
import { LanguageSelectorComponent } from '../shared/language-selector/language-selector.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../i18n-config';
import { HttpClient } from '@angular/common/http';
import { LogoComponent } from '../shared/logo/logo.component';
import { LanguageFlagComponent } from '../shared/language-flag/language-flag.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePageRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    WelcomePage,
    LanguageFlagComponent,
    LanguageSelectorComponent,
    LogoComponent
  ]
})
export class WelcomePageModule { }
