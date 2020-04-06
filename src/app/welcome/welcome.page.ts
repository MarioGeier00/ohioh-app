import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LanguageTranslatorService } from '../shared/data-services/language-translator/language-translator.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  public slideOpts;

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private translation: LanguageTranslatorService
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.translation.initLanguageTranslator().then();
    this.slideOpts = {
      initialSlide: 0
    };
  }

  onNextClick() {
    this.router.navigate(['/user-data']);
  }

}
