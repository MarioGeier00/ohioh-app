import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BackgroundGeolocationResponse, BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationLocationProvider } from '@ionic-native/background-geolocation/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-geolocation-test',
  templateUrl: './geolocation-test.page.html',
  styleUrls: ['./geolocation-test.page.scss'],
})
export class GeolocationTestPage implements OnInit {

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

  constructor(
    public toastController: ToastController,
    private backgroundGeolocation: BackgroundGeolocation,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

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
    console.log(this.newConfig);
    this.backgroundGeolocation.configure(this.newConfig)
      .then(() => {
      });

    this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
      console.log(location);
      const toast = this.toastController.create({
        message: JSON.stringify(location),
        duration: 2000
      }).then(() => toast.present());

      this.backroundLocations = [location, ...this.backroundLocations];
      this.cdr.detectChanges();
      // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
      // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
      // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
      this.backgroundGeolocation.finish(); // FOR IOS ONLY
    });

    this.backgroundGeolocation.on(BackgroundGeolocationEvents.error).subscribe(err => {
      console.log('[ERROR] BackgroundGeolocation error:', err);
      const toast = this.toastController.create({
        message: JSON.stringify(err),
        duration: 2000
      }).then(() => toast.present());

      this.backgroundGeolocation.finish(); // FOR IOS ONLY
    });

    this.backgroundGeolocation.on(BackgroundGeolocationEvents.start).subscribe(err => {
      console.log('[INFO] BackgroundGeolocation service has been started');
      const toast = this.toastController.create({
        message: 'start',
        duration: 2000
      }).then(() => toast.present());

      this.backgroundGeolocation.finish(); // FOR IOS ONLY
    });

    this.backgroundGeolocation.on(BackgroundGeolocationEvents.stop).subscribe(err => {
      console.log('[INFO] BackgroundGeolocation service has been stoped');
      const toast = this.toastController.create({
        message: 'stop',
        duration: 2000
      }).then(() => toast.present());

      this.backgroundGeolocation.finish(); // FOR IOS ONLY
    });

    this.backgroundGeolocation.on(BackgroundGeolocationEvents.background).subscribe(err => {
      console.log('[INFO] App is in background');
      const toast = this.toastController.create({
        message: 'background',
        duration: 2000
      }).then(() => toast.present());

      this.backgroundGeolocation.finish(); // FOR IOS ONLY
    });

    this.backgroundGeolocation.on(BackgroundGeolocationEvents.foreground).subscribe(err => {
      console.log('[INFO] App is in foreground');
      const toast = this.toastController.create({
        message: 'foreground',
        duration: 2000
      }).then(() => toast.present());

      this.backgroundGeolocation.finish(); // FOR IOS ONLY
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





}
