import { Component, OnInit } from '@angular/core';
import { LanguageTranslatorService } from '../shared/data-services/language-translator/language-translator.service';

@Component({
  selector: 'app-data-protection',
  templateUrl: './data-protection.page.html',
  styleUrls: ['./data-protection.page.scss'],
})
export class DataProtectionPage implements OnInit {

  public usePersonalData = false;
  public useGpsData = false;
  public useBluetoothData = false;
  public sendData = false;

  constructor(
  ) { }

  ngOnInit() {
  }

  settingsChanged() {
    // TODO send data to backend
    console.log(`usePersonalData: ${this.usePersonalData}, useGpsData: ${this.useGpsData}, sendData: ${this.sendData}`);
  }
}
