import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE, selectedLanguage } from '../i18n-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public gpsDataStorageDuration = 14;
  public otherDataStorageDuration = 90;
  public trackingInterval = 5;

  constructor(private _translate: TranslateService,
    private router: Router) { }

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


  private navigateHome(): void {
    this.router.navigate(['/home']);
  }

  applyData() {
    // TODO: Validation
    // if (this.validations_form.invalid) {
    //   return;
    // }
    this.navigateHome();
  }

  cancel() {
    this.navigateHome();
  }
  
  numberOnlyValidation(event: any) {
    const inputChar = String.fromCharCode(event.charCode);
    const value = parseInt(inputChar);
    if (isNaN(value)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }


}
