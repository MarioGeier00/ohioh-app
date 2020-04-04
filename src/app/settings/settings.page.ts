import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE, selectedLanguage } from '../i18n-config';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public gpsDataStorageDuration = 14;
  public otherDataStorageDuration = 90;
  public trackingInterval = 5;

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
    console.log(`gpsDataStorageDuration: ${this.gpsDataStorageDuration}, otherDataStorageDuration: ${this.otherDataStorageDuration}, trackingInterval: ${this.trackingInterval}`)
  }
}
