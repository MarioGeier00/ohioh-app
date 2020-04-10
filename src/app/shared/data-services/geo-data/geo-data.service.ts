import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BackgroundGeolocationResponse, BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationLocationProvider } from '@ionic-native/background-geolocation/ngx';
import { Observable, ReplaySubject } from 'rxjs';

export interface GPSError {
  hasError: boolean;
  message: any;
}

@Injectable({
  providedIn: 'root'
})
export class GeoDataService {

  private static readonly GPS_STORE_KEY = 'gps';

  private $lastestLocation = new ReplaySubject<BackgroundGeolocationResponse>(1);
  private $isActivated = new ReplaySubject<boolean>(1);
  private $gpsError = new ReplaySubject<GPSError>(1);

  // locationInterval = 60000 * 5; // Time (in milliseconds) between location information polls.  E.g. 60000*5 = 5 minutes
  // DEBUG: Reduce Time intervall for faster debugging
  locationInterval = 5000;

  newConfig =
    {
      desiredAccuracy: 0, //BackgroundGeolocationAccuracy.HIGH,
      stationaryRadius: 5,
      distanceFilter: 5,
      notificationTitle: 'OHIOH GPS',
      notificationText: 'Deine Daten werden erfasst',
      debug: true, // when true, it beeps every time a loc is read
      startOnBoot: true,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocationLocationProvider.DISTANCE_FILTER_PROVIDER,

      interval: this.locationInterval,
      fastestInterval: this.locationInterval,
      activitiesInterval: this.locationInterval,

      activityType: 'AutomotiveNavigation',
      pauseLocationUpdates: false,
      saveBatteryOnBackground: true,
      stopOnStillActivity: false,
    };

  config: BackgroundGeolocationConfig = {
    desiredAccuracy: 100,
    stationaryRadius: 1,
    distanceFilter: 1,
    debug: true, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false, // enable this to clear background location settings when the app terminates
  };


  public backroundLocations: BackgroundGeolocationResponse[] = new Array();
  public status: string;

  constructor(
    private backgroundGeolocation: BackgroundGeolocation,
    private storage: Storage
  ) {
    this.loadLocations().then<any>(val => {
      if (val) {
        this.backroundLocations = JSON.parse(val);
        if (this.backroundLocations) {
          if (this.backroundLocations.length > 0) {
            this.$lastestLocation.next(location[0]);
          }
        } else {
          this.backroundLocations = new Array();
        }
      }
    });
    this.backgroundGeolocation.checkStatus().then((val) => {
      console.log(val);
      this.$isActivated.next(val.isRunning);
    }, (err) => {
      console.log(err);
      this.$isActivated.next(false);
    });
  }

  public isActive(): Observable<boolean> {
    return this.$isActivated;
    // return this.backgroundGeolocation.checkStatus().then<boolean>((val) => val.isRunning);
  }

  public hasError(): Observable<GPSError> {
    return this.$gpsError;
  }

  public loadLocations(): Promise<any> {
    return this.storage.get(GeoDataService.GPS_STORE_KEY);
  }

  private gpsAllowed = false;
  public useGPS(val: boolean) {
    this.gpsAllowed = val;
    if (this.gpsAllowed) {
      this.startBackgroudGeo();
    } else {
      this.stopBackgroudGeo();
    }
  }

  public isGPSUseAllowed(): boolean {
    return this.gpsAllowed;
  }

  private addLocation(location: BackgroundGeolocationResponse): Promise<any> {
    this.backroundLocations = [location, ...this.backroundLocations];
    this.$lastestLocation.next(location);
    return this.storage.set(GeoDataService.GPS_STORE_KEY, JSON.stringify(this.backroundLocations)).then();
  }


  public getLatestLocation(): Observable<BackgroundGeolocationResponse> {
    return this.$lastestLocation;
  }

  startBackgroudGeo() {
    this.$gpsError.next({ hasError: false, message: '' });
    console.log(this.newConfig);
    this.backgroundGeolocation.configure(this.newConfig)
      .then(() => {
      });

    this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
      console.log(location);
      // const toast = this.toastController.create({
      //   message: JSON.stringify(location),
      //   duration: 2000
      // }).then(() => toast.present());

      this.addLocation(location);

      this.status = 'New location';

      // this.cdr.detectChanges();
      // this.newConfig.notificationTitle = 'New location';
      // this.newConfig.notificationText = location.accuracy; // + 'm -> ' + location.latitude.toString() + location.longitude.toString();
      // this.backgroundGeolocation.configure(this.newConfig);

      // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
      // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
      // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
      this.backgroundGeolocation.finish(); // FOR IOS ONLY
    });

    this.backgroundGeolocation.on(BackgroundGeolocationEvents.error).subscribe(err => {
      console.log('[ERROR] BackgroundGeolocation error:', err);
      // const toast = this.toastController.create({
      //   message: JSON.stringify(err),
      //   duration: 2000
      // }).then(() => toast.present());

      this.status = 'error';
      this.$gpsError.next({ hasError: true, message: err });


      // this.newConfig.notificationTitle = 'Error';
      // if (err) {
      //   this.newConfig.notificationText = JSON.stringify(err);
      // }
      // this.backgroundGeolocation.configure(this.newConfig);

      this.backgroundGeolocation.finish(); // FOR IOS ONLY
    });

    this.backgroundGeolocation.on(BackgroundGeolocationEvents.start).subscribe(err => {
      console.log('[INFO] BackgroundGeolocation service has been started');
      // const toast = this.toastController.create({
      //   message: 'start',
      //   duration: 2000
      // }).then(() => toast.present());

      this.status = 'start';
      this.$isActivated.next(true);

      // this.newConfig.notificationTitle = 'Started';
      // this.newConfig.notificationText = JSON.stringify(err);
      // this.backgroundGeolocation.configure(this.newConfig);

      this.backgroundGeolocation.finish(); // FOR IOS ONLY
    });

    this.backgroundGeolocation.on(BackgroundGeolocationEvents.stop).subscribe(err => {
      console.log('[INFO] BackgroundGeolocation service has been stoped');
      // const toast = this.toastController.create({
      //   message: 'stop',
      //   duration: 2000
      // }).then(() => toast.present());

      this.status = 'Stoped';
      this.$isActivated.next(false);

      // this.newConfig.notificationTitle = 'Stoped';
      // if (err) {
      //   this.newConfig.notificationText = JSON.stringify(err);
      // }
      // this.backgroundGeolocation.configure(this.newConfig);

      this.backgroundGeolocation.finish(); // FOR IOS ONLY
    });

    this.backgroundGeolocation.on(BackgroundGeolocationEvents.background).subscribe(err => {
      console.log('[INFO] App is in background');
      // const toast = this.toastController.create({
      //   message: 'background',
      //   duration: 2000
      // }).then(() => toast.present());

      this.status = 'Backround';

      // this.newConfig.notificationTitle = 'Backround';
      // this.newConfig.notificationText = JSON.stringify(err);
      // this.backgroundGeolocation.configure(this.newConfig);

      this.backgroundGeolocation.finish(); // FOR IOS ONLY
    });

    this.backgroundGeolocation.on(BackgroundGeolocationEvents.foreground).subscribe(err => {
      console.log('[INFO] App is in foreground');
      // const toast = this.toastController.create({
      //   message: 'foreground',
      //   duration: 2000
      // }).then(() => toast.present());

      this.status = 'Foreground';
      // this.newConfig.notificationTitle = 'Foreground';
      // this.newConfig.notificationText = JSON.stringify(err);
      // this.backgroundGeolocation.configure(this.newConfig);

      this.backgroundGeolocation.finish(); // FOR IOS ONLY
    });

    // start recording location
    this.backgroundGeolocation.start().then(() => { },
      (err) => {
        this.$gpsError.next({ hasError: true, message: err });
      });
  }

  getVal(val: BackgroundGeolocationResponse) {
    return JSON.stringify(val);
  }



  stopBackgroudGeo() {
    // If you wish to turn OFF background-tracking, call the #stop method.
    this.backgroundGeolocation.stop();
  }







  // async presentToast(msg: string) {
  //   const toast = await this.toastController.create({
  //     message: msg,
  //     duration: 2000
  //   });
  //   toast.present();
  // }

  // async presentToastWithOptions() {
  //   const toast = await this.toastController.create({
  //     header: 'Toast header',
  //     message: 'Click to Close',
  //     position: 'top',
  //     buttons: [
  //       {
  //         side: 'start',
  //         icon: 'star',
  //         text: 'Favorite',
  //         handler: () => {
  //           console.log('Favorite clicked');
  //         }
  //       }, {
  //         text: 'Done',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   toast.present();
  // }

}
