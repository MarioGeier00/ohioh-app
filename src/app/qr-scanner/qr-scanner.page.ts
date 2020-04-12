import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ToastController, MenuController, AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageTranslatorService } from '../shared/data-services/language-translator/language-translator.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {

  public error: boolean;
  public isApp: boolean;

  public noAccessGranted: boolean;
  public openSettingsNeeded: boolean;

  private scanSubscription: Subscription;

  constructor(
    private qrScanner: QRScanner,
    public alertController: AlertController,
    public toastController: ToastController,
    private menuCtrl: MenuController,
    private router: Router,
    private translation: LanguageTranslatorService,
    private platform: Platform
  ) {
    this.menuCtrl.enable(false);
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentAllowAccessMessage() {
    const alert = await this.alertController.create({
      header: this.translation.get('qrScanner.allowAccessTitle'),
      message: this.translation.get('qrScanner.allowAccessMsg'),
      buttons: [
        {
          text: this.translation.get('qrScanner.cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.noAccessGranted = true;
          }
        }, {
          text: this.translation.get('qrScanner.yes'),
          handler: () => {
            this.qrScanner.openSettings();
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.requestCameraAccess();
  }


  requestCameraAccess() {
    this.qrScanner.prepare().then(
      status => {
        this.noAccessGranted = !status.authorized;
        this.openSettingsNeeded = status.denied;
        if (status.authorized) {
          // camera permission was granted
          this.startQRCodeScan();
        }
      },
      err => this.errorReceived(err)
    );
  }

  close() {
    if (this.scanSubscription) {
      this.scanSubscription.unsubscribe();
    }
    this.qrScanner.hide();
    this.qrScanner.pausePreview();

    this.menuCtrl.enable(true);
    this.router.navigate(['/home']);
  }

  startQRCodeScan() {
    this.qrScanner.show();
    // start scanning
    this.scanSubscription = this.qrScanner.scan().subscribe(text => this.textScanned(text), err => this.errorReceived(err));
  }

  textScanned(value: string) {
    // TODO: check for XSS
    console.log('Scanned: ', value);
    this.presentToast(value);
  }

  errorReceived(err: any) {
    this.isApp = this.platform.is('mobile') && !this.platform.is('mobileweb');

    console.log(err);
    this.error = true;
  }

}
