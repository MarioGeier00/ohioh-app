import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ToastController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private qrScanner: QRScanner,
    public toastController: ToastController,
    private menuCtrl: MenuController,
    private router: Router) {
    this.menuCtrl.enable(true);
  }
  ngOnInit() {
    this.qrScanner.pausePreview();
  }

  openQRScan() {
    this.router.navigate(['/qr-scanner']);
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
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
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

}
