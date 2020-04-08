import { Component, OnInit } from '@angular/core';
import { BackgroundGeolocationResponse, BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents } from '@ionic-native/background-geolocation/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-geolocation-test',
  templateUrl: './geolocation-test.page.html',
  styleUrls: ['./geolocation-test.page.scss'],
})
export class GeolocationTestPage implements OnInit {


  public backroundLocations: BackgroundGeolocationResponse[] = new Array();

  constructor(
    public toastController: ToastController,
    private backgroundGeolocation: BackgroundGeolocation,
  ) { }

  ngOnInit() {
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
    console.log(this.config);
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





}
