import { Component, OnInit } from '@angular/core';
import { LanguageTranslatorService } from '../data-services/language-translator/language-translator.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {


  public languages: { name: string, id: string }[] = [
    { name: 'Deutsch', id: 'de' },
    { name: 'Englisch', id: 'en' },
    { name: 'Türkisch', id: 'tr' },
    { name: 'Russisch', id: 'ru' },
    { name: 'Polnisch', id: 'pl' },
    { name: 'Arabisch', id: 'sa' },
    { name: 'Kurdisch', id: 'ku' }
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
