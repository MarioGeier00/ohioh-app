import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-protection',
  templateUrl: './data-protection.page.html',
  styleUrls: ['./data-protection.page.scss'],
})
export class DataProtectionPage implements OnInit {
  
  private usePersonalData = false;
  private useGpsData = false;
  private sendData = false;
  
  constructor() { }

  ngOnInit() {
  }

  settingsChanged() {
    // TODO send data to backend
    console.log(`usePersonalData: ${this.usePersonalData}, useGpsData: ${this.useGpsData}, sendData: ${this.sendData}`);
  }
}
