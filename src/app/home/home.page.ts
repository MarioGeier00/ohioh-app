import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../shared/data-services/user-service/user.service';
import { LanguageTranslatorService } from '../shared/data-services/language-translator/language-translator.service';

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

  openQRScan() {
    this.router.navigate(['/qr-scanner']);
  }

  navigateToUserData() {
    this.router.navigate(['/user-data']);
  }

}
