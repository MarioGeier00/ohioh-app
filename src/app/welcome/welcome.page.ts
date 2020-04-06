import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { selectedLanguage, DEFAULT_LANGUAGE } from '../i18n-config';
import { LanguageTranslatorService } from '../shared/data-services/language-translator/language-translator.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  slideOpts;

  constructor(
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.slideOpts = {
      initialSlide: 0
    };
  }

  ionViewDidEnter() {
  }

  onNextClick() {
    this.router.navigate(['/user-data']);
  }

}
