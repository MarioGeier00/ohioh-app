import { Component, OnInit } from '@angular/core';
import { LanguageTranslatorService } from '../data-services/language-translator/language-translator.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {

  public languages: { id: string, prototype: boolean }[] = [
    { id: 'de', prototype: false},
    { id: 'en', prototype: false},
    { id: 'tr', prototype: true},
    { id: 'ru', prototype: true},
    { id: 'pl', prototype: true},
    { id: 'sa', prototype: true},
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
