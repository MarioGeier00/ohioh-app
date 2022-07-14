import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {UserService} from '../shared/data-services/user/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  @ViewChild('slider', {static: true}) slider;

  public slideOpts;
  public hasAccepted;

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    public userService: UserService,
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.slideOpts = {
      initialSlide: 0
    };
    this.hasAccepted = false;
    this.slider.lockSwipes(true);
    this.slider.slideTo(0);
  }

  onNextClick() {
    this.router.navigate(['/user-data']);
  }

  checkAcceptedAndContinue() {
    if (this.hasAccepted) {
      this.slider.lockSwipes(false);
      this.slider.slideNext();
    } else {
      this.slider.lockSwipes(true);
      this.slider.slideTo(0);
    }
  }

  hasAcceptedChanged() {
    if (this.hasAccepted) {
      this.slider.lockSwipes(false);
    } else {
      this.slider.lockSwipes(true);
      this.slider.slideTo(0);
    }
    this.userService.setHasAcceptedAGBs(this.hasAccepted);
  }

  onSlideChange() {
    if (!this.hasAccepted) {
      this.slider.lockSwipes(true);
      this.slider.slideTo(0);
    }
  }

}
