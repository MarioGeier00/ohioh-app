import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.page.html',
  styleUrls: ['./user-data.page.scss'],
})
export class UserDataPage implements OnInit {

  constructor(private router: Router,
    private menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  applyData() {
    this.router.navigate(['/home']);
  }

}
