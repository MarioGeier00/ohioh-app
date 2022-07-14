import {Component, OnInit} from '@angular/core';
import {GeoDataService} from '../shared/data-services/geo-data/geo-data.service';

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
    public geoData: GeoDataService,
  ) {
    this.useGpsData = this.geoData.isGPSUseAllowed();
  }

  ngOnInit() {
  }

  settingsChanged() {
    // TODO send data to backend
    console.log(`usePersonalData: ${this.usePersonalData}, useGpsData: ${this.useGpsData}, sendData: ${this.sendData}`);
    this.geoData.useGPS(this.useGpsData);
  }
}
