import { Component, OnInit } from '@angular/core';
import { changeSelectedLanguage, DEFAULT_LANGUAGE, selectedLanguage } from 'src/app/i18n-config';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {


  public languages = [
    { name: 'Deutsch', id: 'de' },
    { name: 'Englisch', id: 'en' },
    { name: 'Türkisch', id: 'tr' },
    { name: 'Russisch', id: 'ru' },
    { name: 'Polnisch', id: 'pl' },
    { name: 'Arabisch', id: 'sa' },
    { name: 'Kurdisch', id: 'ku' }
  ];

  constructor(private _translate: TranslateService) { }

  ngOnInit() {
    this._translate.setDefaultLang(DEFAULT_LANGUAGE);
    if (selectedLanguage != null) {
      this._translate.use(selectedLanguage);
    }
  }

  languageSelected(event: { detail: { value: any; }; }) {
    changeSelectedLanguage(event.detail.value);
    this._translate.use(event.detail.value)
  }

}
