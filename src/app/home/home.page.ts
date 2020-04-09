import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
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
    public userService: UserService,
    public popoverController: PopoverController) {
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

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PrototypeComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}

@Component({
  selector: 'app-prototype',
  template: `<a>Test</a>`,
})
export class PrototypeComponent {

}
