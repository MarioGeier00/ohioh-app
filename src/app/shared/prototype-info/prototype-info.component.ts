import {Component} from '@angular/core';
import {LanguageTranslatorService} from '../data-services/language-translator/language-translator.service';


@Component({
  selector: 'app-prototype-info',
  templateUrl: './prototype-info.component.html',
  styleUrls: ['./prototype-info.component.scss'],
})
export class PrototypeInfoComponent {

  public content: string;

  constructor(
    private languageService: LanguageTranslatorService
  ) {
    this.content = this.languageService.getPrototypeInfoText();
  }

}
