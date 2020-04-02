import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  slideOpts;

  constructor(private router: Router) { }

  ngOnInit() {
    this.slideOpts = {
      initialSlide: 0
    };
  }

  onNextClick() {
    this.router.navigate(['/user-data']);
  }

}
