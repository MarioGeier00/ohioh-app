import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PrototypeInfoComponent } from '../shared/prototype-info/prototype-info.component';
import { UserService } from '../shared/data-services/user/user.service';

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
    public popoverController: PopoverController
  ) {
    this.menuCtrl.enable(true);
    this.userService.isUserDataEmpty()
      .subscribe((isEmpty) => this.userDataAvailable = !isEmpty);
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
      component: PrototypeInfoComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}
