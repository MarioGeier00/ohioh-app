import {Component, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {GeoDataService} from '../shared/data-services/geo-data/geo-data.service';
import {BackgroundGeolocationResponse} from '@awesome-cordova-plugins/background-geolocation';

@Component({
  selector: 'app-geolocation-test',
  templateUrl: './geolocation-test.page.html',
  styleUrls: ['./geolocation-test.page.scss'],
})
export class GeolocationTestPage implements OnInit {

  public backgroundGeolocations: BackgroundGeolocationResponse[] = [];

  public data: string;

  constructor(
    public toastController: ToastController,
    public geoData: GeoDataService,
  ) {
  }

  ngOnInit() {
    this.geoData.loadLocations().then(val => {
      this.data = val;
      if (val) {
        this.backgroundGeolocations = JSON.parse(val);
      }
    });
  }

  sync() {
    this.backgroundGeolocations = this.geoData.backroundLocations;
  }

  syncStore() {
    this.geoData.loadLocations().then(val => {
      this.data = val;
      this.backgroundGeolocations = JSON.parse(val);
    });
  }

}
