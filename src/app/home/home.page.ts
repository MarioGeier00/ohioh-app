import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../shared/data-services/user-service/user.service';
import { PrototypeInfoComponent } from '../shared/prototype-info/prototype-info.component';
import { Observable } from 'rxjs';
import { BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { GeoDataService, GPSError } from '../shared/data-services/geo-data/geo-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public userDataAvailable: boolean;

  public $lastesLocationUpdate: Observable<BackgroundGeolocationResponse>;
  public $gpsStatus: Observable<boolean>;
  public $gpsError: Observable<GPSError>;

  public gpsStatus: boolean;
  public gpsError: GPSError;


  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    public userService: UserService,
    public geoData: GeoDataService,
    public popoverController: PopoverController
  ) {
    this.$lastesLocationUpdate = this.geoData.getLatestLocation();
    this.$gpsStatus = this.geoData.isActive();
    this.$gpsError = this.geoData.hasError();

    this.$gpsStatus.subscribe((val) => this.gpsStatus = val);
    this.$gpsError.subscribe((val) => this.gpsError = val);

    this.menuCtrl.enable(true);

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

  navigateToPrivacySettings() {
    this.router.navigate(['/data-protection']);
  }

  activateGPS() {
    this.geoData.useGPS(true);
  }


  public getGPSWarningStatus(): boolean {
    if (!this.gpsStatus) {
      return true;
    }
    return !this.gpsStatus.active;
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
