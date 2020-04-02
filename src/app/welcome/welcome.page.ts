import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  slideOpts = {
    initialSlide: 4
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onNextClick() {
    this.router.navigate(['/user-data']);
  }

}
