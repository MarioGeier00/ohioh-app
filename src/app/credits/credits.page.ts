import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/data-services/user-service/user.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.page.html',
  styleUrls: ['./credits.page.scss'],
})
export class CreditsPage implements OnInit {

  constructor(
    public userService: UserService,
  ) { }

  ngOnInit() {
  }

}
