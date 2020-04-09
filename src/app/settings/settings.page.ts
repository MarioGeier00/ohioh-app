import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageTranslatorService } from '../shared/data-services/language-translator/language-translator.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public gpsDataStorageDuration = 14;
  public otherDataStorageDuration = 90;
  public trackingInterval = 5;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
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

  reset() {
    this.gpsDataStorageDuration = 14;
    this.otherDataStorageDuration = 90;
    this.trackingInterval = 5;
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
