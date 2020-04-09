import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../shared/data-services/user/user.service';
import { LanguageTranslatorService } from '../shared/data-services/language-translator/language-translator.service';

@Component({
  selector: 'app-infection-warning',
  templateUrl: './infection-warning.page.html',
  styleUrls: ['./infection-warning.page.scss'],
})
export class InfectionWarningPage implements OnInit {

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private userService: UserService,
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  onNextClick() {
    this.menuCtrl.enable(true);
    this.router.navigate(['/home']);
  }

}
