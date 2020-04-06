import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE, selectedLanguage } from '../i18n-config';
import { UserService } from '../shared/data-services/user-service/user.service';

@Component({
  selector: 'app-infection-warning',
  templateUrl: './infection-warning.page.html',
  styleUrls: ['./infection-warning.page.scss'],
})
export class InfectionWarningPage implements OnInit {

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private _translate: TranslateService,
    private userService: UserService) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this._translate.setDefaultLang(DEFAULT_LANGUAGE);
    if (selectedLanguage != null) {
      this._translate.use(selectedLanguage);
    }
  }

  onNextClick() {
    this.menuCtrl.enable(true);
    this.router.navigate(['/home']);
  }

}
