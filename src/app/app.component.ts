import { Component, OnInit } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './shared/data-services/user-service/user.service';
import { Router } from '@angular/router';
import { LanguageTranslatorService } from './shared/data-services/language-translator/language-translator.service';
import { PrototypeInfoList } from './shared/prototype-info/prototype-info.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
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
      url: '/location/add',
      icon: 'add-circle'
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
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    public router: Router,
    private translation: LanguageTranslatorService,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.userService.loadDeveloperMode().then(
      () => {
        this.translation.initLanguageTranslator().then(() => {
          if (!this.userService.DeveloperMode) {
            this.presentInfoAlert();
          }
        });

        this.userService.isUserStored().then((isUserStored) => {
          if (!isUserStored && !this.userService.DeveloperMode) {
            this.router.navigate(['/welcome']);
          }
        });

      }
    );

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });


  }

  async presentInfoAlert() {
    const alert = await this.alertController.create({
      header: 'Prototype App',
      message: this.translation.getPrototypeInfoText(),
      buttons: ['OK']
    });

    await alert.present();
  }


  ngOnInit() {
  }

  deleteAll() {
    this.userService.deleteUser();
  }

}
