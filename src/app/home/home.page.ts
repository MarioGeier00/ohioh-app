import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ToastController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE, selectedLanguage } from '../i18n-config';
import { UserService } from '../shared/data-services/user-service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public userDataAvailable: boolean;

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private _translate: TranslateService,
    public userService: UserService) {
    this.menuCtrl.enable(true);
    this.userService.isUserStored().then((isUserStored) => {
      if (!isUserStored) {
        this.router.navigate(['/welcome']);
      }
    });
    this.userService.isUserDataEmpty().then(isEmpty => {
      console.log(isEmpty);
      this.userDataAvailable = !isEmpty;
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this._translate.setDefaultLang(DEFAULT_LANGUAGE);
    if (selectedLanguage != null) {
      this._translate.use(selectedLanguage);
    }
  }

  openQRScan() {
    this.router.navigate(['/qr-scanner']);
  }

  openInfectionWarning() {
    this.router.navigate(['/infection-warning']);
  }
}
