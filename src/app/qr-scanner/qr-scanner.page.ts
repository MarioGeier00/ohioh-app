import {Component, OnInit} from '@angular/core';
import {AlertController, MenuController, Platform, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {LanguageTranslatorService} from '../shared/data-services/language-translator/language-translator.service';

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
  private qrScanner: any;
  constructor(
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
    this.error = false;
    this.noAccessGranted = false;
    this.openSettingsNeeded = false;

    this.requestCameraAccess();
  }

  showInfo(): boolean {
    return this.error || this.noAccessGranted;
  }

  requestCameraAccess() {
    // this.qrScanner.prepare().then(
    //   status => this.onStatusReceived(status),
    //   err => this.errorReceived(err)
    // );
  }

  // onStatusReceived(status: QRScannerStatus) {
  //   this.noAccessGranted = !status.authorized;
  //   this.openSettingsNeeded = status.denied;
  //   console.log(this.noAccessGranted);
  //   console.log(this.openSettingsNeeded);
  //   if (status.authorized) {
  //     // camera permission was granted
  //     this.startQRCodeScan();
  //   }
  // }

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
    this.qrScanner.hide();
    this.qrScanner.pausePreview();

    // workaround for the case that qrScanner.prepare throws an exception
    // instead of excuting the status function
    try {
      if (err.name === 'CAMERA_ACCESS_DENIED') {
        this.noAccessGranted = true;
        this.openSettingsNeeded = true;
      }
    } catch {

    }

    console.log(err);
    this.isApp = this.platform.is('mobile') && !this.platform.is('mobileweb');
    this.error = true;
    // this.qrScanner.destroy().then((status) => this.onStatusReceived(status));
  }

  openSettings() {
    this.qrScanner.openSettings();
  }

}
