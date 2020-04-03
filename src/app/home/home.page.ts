import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Observable, Subscription, config } from 'rxjs';
import { BackgroundGeolocation, BackgroundGeolocationConfig, 
  BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public locations: Geoposition[] = new Array();
  public backroundLocations: BackgroundGeolocationResponse[] = new Array();

  private locationWatcher: Observable<Geoposition>;
  private locationSubscription: Subscription;

  constructor(private qrScanner: QRScanner,
    public toastController: ToastController,
    private backgroundGeolocation: BackgroundGeolocation,
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.qrScanner.pausePreview();
  }

  config: BackgroundGeolocationConfig = {
    desiredAccuracy: 100,
    stationaryRadius: 1,
    distanceFilter: 1,
    debug: true, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false, // enable this to clear background location settings when the app terminates
  };
  
  changeValB(value: number) {
    this.config.stationaryRadius = value;
  }
  
  changeValAcc(value: number) {
    this.config.desiredAccuracy = value;
  }

  changeValA(value: number) {
    this.config.distanceFilter = value;
  }

  startBackgroudGeo() {
    console.log (this.config);
    this.backgroundGeolocation.configure(this.config)
      .then(() => {

        this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
          console.log(location);
          const toast = this.toastController.create({
            message: JSON.stringify(location),
            duration: 2000
          }).then(() => toast.present());

          this.backroundLocations = [location, ...this.backroundLocations];
          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
          this.backgroundGeolocation.finish(); // FOR IOS ONLY
        });

      });

    // start recording location
    this.backgroundGeolocation.start();
  }

  getVal(val: BackgroundGeolocationResponse) {
    return JSON.stringify(val);
  }



  stopBackgroudGeo() {
    // If you wish to turn OFF background-tracking, call the #stop method.
    this.backgroundGeolocation.stop();
  }







  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  scannQRCode() {
    this.qrScanner.destroy();
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        this.qrScanner.openSettings();
        if (status.authorized) {
          // camera permission was granted
          this.presentToast('QR Code Scanner gestartet');
          this.qrScanner.show();
          // start scanning
          const scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.presentToast(text);
            this.qrScanner.pausePreview();

            this.qrScanner.hide(); // hide camera preview
            this.qrScanner.destroy();
            scanSub.unsubscribe(); // stop scanning
          });

        } else if (status.denied) {
          this.presentToast('Der Kamerazugriff wurde verweigert');
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          this.presentToast('Bitte geben Sie den Kamerazugriff unter den App-Einstellungen frei');
        }
      })
      .catch((e: any) => {
        console.log('Error is', e);
        this.presentToast('Es ist ein Fehler aufgetreten oder es ist keine Kamera vorhanden');
      });
  }

  isScanningLocation(): boolean {
    if (!this.locationSubscription)
      return false;
    return this.locationSubscription.closed;
  }

  scanGeolocation() {

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      this.presentToast(error.message);
      console.log('Error getting location', error);
    });

    if (this.isScanningLocation()) {
      this.locationSubscription.unsubscribe();
      return;
    } else {
      this.locationWatcher = this.geolocation.watchPosition();
      this.locationSubscription = this.locationWatcher.subscribe(data => this.processLocation(data));
    }

  }

  async processLocation(pos: Geoposition) {
    console.log(pos);
    this.locations = [pos, ...this.locations];
    let msg;
    if (!pos.coords) {
      msg = 'Fehler';
    } else {
      msg = pos.coords.latitude.toString() + '\t' + pos.coords.latitude.toString();
      const toast = await this.toastController.create({
        message: msg,
        duration: 400
      });
      toast.present();
    }
  }

}
