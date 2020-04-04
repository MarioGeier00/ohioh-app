import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-infection-warning',
  templateUrl: './infection-warning.page.html',
  styleUrls: ['./infection-warning.page.scss'],
})
export class InfectionWarningPage implements OnInit {

  constructor(private menuCtrl: MenuController,
    private router: Router) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  onNextClick() {
    
  }

}
