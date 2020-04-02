import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public locations: Geoposition[] = new Array();

  constructor(private qrScanner: QRScanner,
              public toastController: ToastController,
              private geolocation: Geolocation
              ) { }

  ngOnInit() {
    this.qrScanner.pausePreview();
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


  scanGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });

    const watch = this.geolocation.watchPosition();
    watch.subscribe(async (data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      console.log(data);
      this.locations.push(data);
      let msg;
      if (!data.coords) {
        msg = 'Fehler';
      } else {
        msg = data.coords.latitude.toString() + '\t' +  data.coords.latitude.toString();
      }

      const toast = await this.toastController.create({
        message: msg,
        duration: 400
      });
      toast.present();

     });
  }

}
