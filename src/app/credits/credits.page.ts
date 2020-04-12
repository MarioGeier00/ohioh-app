import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/data-services/user/user.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.page.html',
  styleUrls: ['./credits.page.scss'],
})
export class CreditsPage implements OnInit {

  public showDev = false;
  private counter = 0;

  constructor(
    public userService: UserService,
  ) { 
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
