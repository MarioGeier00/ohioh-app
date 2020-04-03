import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'OHIO Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Einführungstutorial',
      url: '/welcome',
      icon: 'information-circle'
    },
    {
      title: 'Daten zur Person ändern',
      url: '/user-data',
      icon: 'person-circle'
    },
    {
      title: 'Privatsphäreneinstellungen',
      url: '/user-data',
      icon: 'shield-checkmark'
    },
    {
      title: 'Einstellungen',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'Aufenthalt nachtragen',
      url: '/location/add',
      icon: 'add-circle'
    },
    {
      title: 'Über die Entwickler',
      url: '/credits',
      icon: 'code'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  deleteAll() {
    throw new Error();
  }
}
