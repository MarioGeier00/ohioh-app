import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE, selectedLanguage } from '../i18n-config';

@Component({
  selector: 'app-data-protection',
  templateUrl: './data-protection.page.html',
  styleUrls: ['./data-protection.page.scss'],
})
export class DataProtectionPage implements OnInit {
  
  public usePersonalData = false;
  public useGpsData = false;
  public sendData = false;
  
  constructor(private _translate: TranslateService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this._translate.setDefaultLang(DEFAULT_LANGUAGE);
    if (selectedLanguage != null) {
      this._translate.use(selectedLanguage);
    }
  }

  settingsChanged() {
    // TODO send data to backend
    console.log(`usePersonalData: ${this.usePersonalData}, useGpsData: ${this.useGpsData}, sendData: ${this.sendData}`);
  }
}
