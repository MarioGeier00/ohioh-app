import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {LanguageTranslatorService} from './shared/data-services/language-translator/language-translator.service';
import {UserService} from './shared/data-services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title: 'home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'userData',
      url: '/user-data',
      icon: 'person-circle'
    },
    {
      title: 'dataProtection',
      url: '/data-protection',
      icon: 'shield-checkmark'
    },
    {
      title: 'settings',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'addLocations',
      url: '/add-location',
      icon: 'add-circle'
    },
    {
      title: 'qrGenerator',
      url: '/qr-generator',
      icon: 'qr-code'
    },
    {
      title: 'welcome',
      url: '/welcome',
      icon: 'help-circle'
    },
    {
      title: 'credits',
      url: '/credits',
      icon: 'information-circle'
    },
  ];

  constructor(
    public router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    private userService: UserService,
    private translation: LanguageTranslatorService,
  ) {
  }

  ngOnInit() {
    this.userService.loadDebugMode();

    this.translation.initLanguageTranslator().then(() => {
      if (!this.userService.developerMode) {
        this.presentInfoAlert();
      }
    });

    this.userService.loadDeveloperMode()?.then(
      () => {


        if (this.userService.developerMode) {
          this.appPages.push({
            title: 'geo',
            url: '/geo',
            icon: 'location'
          });
        }

        if (!this.userService.isUserStored() && !this.userService.developerMode) {
          this.router.navigate(['/welcome']);
        }

      }
    );
  }

  async presentInfoAlert() {
    const alert = await this.alertController.create({
      header: 'Prototype App',
      message: this.translation.getPrototypeInfoText(),
      buttons: ['OK']
    });

    await alert.present();
  }


  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  deleteAll() {
    this.presentToast(this.translation.get('menu.deleteAllToast'));
    this.userService.deleteUser();
  }


  downloadAPK() {
    window.location.href = 'https://ohioh.azurewebsites.net/ohiohApp.apk';
    this.presentToast(this.translation.get('menu.downloadStarted'));
  }

}
