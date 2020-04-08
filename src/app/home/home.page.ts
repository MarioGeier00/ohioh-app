import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ToastController } from '@ionic/angular';
// import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Observable, Subscription, config } from 'rxjs';
import { BackgroundGeolocation, BackgroundGeolocationConfig, 
  BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  constructor() { }

  ngOnInit() {
  }


}
