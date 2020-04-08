import { Component, OnInit } from '@angular/core';
import { LanguageTranslatorService } from '../data-services/language-translator/language-translator.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {


  public languages: string[] = [
    'de',
    'en',
    'tr',
    'ru',
    'pl',
    'sa',
    'ku'
  ];

  constructor(
    public translator: LanguageTranslatorService,
  ) { }

  ngOnInit() {
  }

  languageSelected(value: string) {
    this.translator.changeSelectedLanguage(value);
  }

}
