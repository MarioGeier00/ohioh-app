import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PrototypeInfoComponent } from '../shared/prototype-info/prototype-info.component';
import { UserService } from '../shared/data-services/user/user.service';
import { Subscription } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  public userDataAvailable: boolean;

  private disconnectSubscription: Subscription;
  private connectSubscription: Subscription;
 
  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    public userService: UserService,
    public popoverController: PopoverController,
    private network: Network
  ) {
    this.menuCtrl.enable(true);
    this.userService.isUserDataEmpty()
      .subscribe((isEmpty) => this.userDataAvailable = !isEmpty);
  }

  ngOnInit() {
    this.setupNetworkConnectionCheck();
  }

  ngOnDestroy() {
    this.unsubscribeNetworkConnectionCheck();
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

  setupNetworkConnectionCheck() {
    // watch network for a disconnection
    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });

    // watch network for a connection
    this.connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

  }

  unsubscribeNetworkConnectionCheck() {
    if (this.disconnectSubscription) {
      // stop disconnect watch
      this.disconnectSubscription.unsubscribe();
    }

    if (this.connectSubscription) {
      // stop connect watch
      this.connectSubscription.unsubscribe();
    }
  }


}
