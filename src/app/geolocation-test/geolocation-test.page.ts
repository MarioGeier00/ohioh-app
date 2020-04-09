import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { GeoDataService } from '../shared/data-services/geo-data/geo-data.service';

@Component({
  selector: 'app-geolocation-test',
  templateUrl: './geolocation-test.page.html',
  styleUrls: ['./geolocation-test.page.scss'],
})
export class GeolocationTestPage implements OnInit {

  public backroundLocations: BackgroundGeolocationResponse[] = new Array();

  public data: string;

  constructor(
    public toastController: ToastController,
    private cdr: ChangeDetectorRef,
    public geoData: GeoDataService
  ) {

  }

  ngOnInit() {
    this.geoData.loadLocations().then(val => {
      this.data = val;
      if (val) {
        this.backroundLocations = JSON.parse(val);
      }
    });
  }

  sync() {
    this.backroundLocations = this.geoData.backroundLocations;

  }

  syncStore() {
    this.geoData.loadLocations().then(val => {
      this.data = val;
      this.backroundLocations = JSON.parse(val);
    });
  }

  // changeValB(value: number) {
  //   this.config.stationaryRadius = value;
  // }

  // changeValAcc(value: number) {
  //   this.config.desiredAccuracy = value;
  // }

  // changeValA(value: number) {
  //   this.config.distanceFilter = value;
  // }


}
