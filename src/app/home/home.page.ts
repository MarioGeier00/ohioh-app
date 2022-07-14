import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MenuController, PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';
import {PrototypeInfoComponent} from '../shared/prototype-info/prototype-info.component';
import {Observable, Subscription} from 'rxjs';
import {GeoDataService, GPSError} from '../shared/data-services/geo-data/geo-data.service';
import {UserService} from '../shared/data-services/user/user.service';
import {BackgroundGeolocationResponse} from '@awesome-cordova-plugins/background-geolocation';
import {Network} from '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  userDataAvailable: boolean;

  $lastesLocationUpdate: Observable<BackgroundGeolocationResponse>;
  $gpsStatus: Observable<boolean>;
  $gpsError: Observable<GPSError>;

  private lastesLocationUpdateSubscription: Subscription;
  private gpsStatusSubscription: Subscription;
  private gpsErrorSubscription: Subscription;

  gpsStatus: boolean;
  gpsError: GPSError;
  lastGPSData: number;

  private disconnectSubscription: Subscription;
  private connectSubscription: Subscription;

  disconnected: boolean;

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    public userService: UserService,
    private geoData: GeoDataService,
    public popoverController: PopoverController,
    private changeDetector: ChangeDetectorRef,
    private network: Network
  ) {
    this.$lastesLocationUpdate = this.geoData.getLatestLocation();
    this.$gpsStatus = this.geoData.isActive();
    this.$gpsError = this.geoData.hasError();

    this.menuCtrl.enable(true);
    this.userService.isUserDataEmpty()
      .subscribe((isEmpty) => this.userDataAvailable = !isEmpty);
  }

  ngOnInit() {
    this.disconnected = true;
    this.setupNetworkConnectionCheck();

    this.lastesLocationUpdateSubscription = this.$lastesLocationUpdate.subscribe((val) => {
      this.lastGPSData = val.time;
      this.changeDetector.detectChanges();
    });
    this.gpsStatusSubscription = this.$gpsStatus.subscribe((val) => {
      this.gpsStatus = val;
      this.changeDetector.detectChanges();
    });
    this.gpsErrorSubscription = this.$gpsError.subscribe((val) => {
      this.gpsError = val;
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy() {
    this.unsubscribeNetworkConnectionCheck();
    this.lastesLocationUpdateSubscription.unsubscribe();
    this.gpsStatusSubscription.unsubscribe();
    this.gpsErrorSubscription.unsubscribe();
  }

  openQRScan() {
    this.router.navigate(['/qr-scanner']);
  }

  navigateToUserData() {
    this.router.navigate(['/user-data']);
  }

  navigateToPrivacySettings() {
    this.router.navigate(['/data-protection']);
  }

  activateGPS() {
    this.geoData.useGPS(true);
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
      this.disconnected = true;
    });
    // watch network for a connection
    this.connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      this.disconnected = false;
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
