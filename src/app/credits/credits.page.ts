import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE, selectedLanguage } from '../i18n-config';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.page.html',
  styleUrls: ['./credits.page.scss'],
})
export class CreditsPage implements OnInit {

  constructor(private _translate: TranslateService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this._translate.setDefaultLang(DEFAULT_LANGUAGE);
    if (selectedLanguage != null) {
      this._translate.use(selectedLanguage);
    }
  }
}
