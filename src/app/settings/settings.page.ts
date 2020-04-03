import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private gpsDataStorageDuration = 14;
  private otherDataStorageDuration = 90;
  private trackingInterval = 5;

  constructor() { }

  ngOnInit() {
  }

  settingsChanged() {
    // TODO send data to backend
    console.log(`gpsDataStorageDuration: ${this.gpsDataStorageDuration}, otherDataStorageDuration: ${this.otherDataStorageDuration}, trackingInterval: ${this.trackingInterval}`)
  }
}
