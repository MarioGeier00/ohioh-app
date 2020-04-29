import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/data-services/user/user.service';
import { MenuController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.page.html',
  styleUrls: ['./credits.page.scss'],
})
export class CreditsPage implements OnInit {

  public showDev = false;
  private counter = 0;

  public comesFromWelcomePage: boolean;

  constructor(
    private router: Router,
    private location: Location,
    public userService: UserService,
    private menuCtrl: MenuController
  ) {
    // console.log(this.location.);
    // this.router.events
    // .pipe(filter(event => event instanceof NavigationEnd))
    // .subscribe(({urlAfterRedirects}: NavigationEnd) => {
    //   this.history = [...this.history, urlAfterRedirects];
    // });
    this.menuCtrl.enable(false);
    
    this.showDev = this.userService.DeveloperMode;
  }

  ngOnInit() {
  }

  devEnable() {
    this.counter++;
    if (this.counter > 5) {
      this.showDev = true;
    }
  }

  changeDev(val: boolean) {
    console.log(val);
    this.userService.DeveloperMode = val;
    this.userService.saveDeveloperMode();
  }

}
