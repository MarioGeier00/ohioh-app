import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplacePipe } from './replace.pipe';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageFlagComponent } from './language-flag/language-flag.component';
import { IonicModule } from '@ionic/angular';
import { PrototypeInfoComponent } from './prototype-info/prototype-info.component';


@NgModule({
  declarations: [
    ReplacePipe,
    LanguageSelectorComponent,
    LanguageFlagComponent,
    PrototypeInfoComponent
  ],
  exports: [
    ReplacePipe,
    LanguageSelectorComponent,
    LanguageFlagComponent,
    PrototypeInfoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild()
  ],
  entryComponents: [PrototypeInfoComponent]
})
export class SharedModule { }
