import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { selectedLanguage, DEFAULT_LANGUAGE } from '../i18n-config';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  slideOpts;

  constructor(private router: Router,
    private menuCtrl: MenuController,
    private _translate: TranslateService) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.slideOpts = {
      initialSlide: 0
    };
  }

  ionViewDidEnter() {
    this._translate.setDefaultLang(DEFAULT_LANGUAGE);
    if (selectedLanguage != null) {
      this._translate.use(selectedLanguage);
    }
  }

  onNextClick() {
    this.router.navigate(['/user-data']);
  }

}
