import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplacePipe } from './replace.pipe';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageFlagComponent } from './language-flag/language-flag.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ReplacePipe,
    LanguageSelectorComponent,
    LanguageFlagComponent
  ],
  exports: [
    ReplacePipe,
    LanguageSelectorComponent,
    LanguageFlagComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild()
  ]
})
export class SharedModule { }
