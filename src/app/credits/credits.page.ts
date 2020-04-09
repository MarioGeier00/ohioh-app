import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/data-services/user-service/user.service';

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
  ) { }

  ngOnInit() {
  }



  devEnable() {
    this.counter++;
    if (this.counter > 5) {
      this.showDev = true;
    }
  }

}
