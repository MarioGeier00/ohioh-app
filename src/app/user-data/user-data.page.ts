import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { DEFAULT_LANGUAGE, selectedLanguage } from '../i18n-config';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../shared/data-services/user-service/user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.page.html',
  styleUrls: ['./user-data.page.scss'],
})
export class UserDataPage implements OnInit {

  constructor(private router: Router,
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private _translate: TranslateService,
    private userData: UserService) {
    this.menuCtrl.enable(false);
  }

  validations_form: FormGroup;

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      prename: new FormControl('', Validators.nullValidator),
      name: new FormControl('', Validators.nullValidator),
      phone: new FormControl('', Validators.nullValidator),
      age: new FormControl('', Validators.compose([Validators.min(1), Validators.max(200), Validators.pattern('[0-9]*')]) ),
      residence: new FormControl('', Validators.nullValidator),
    });
  }

  ionViewDidEnter() {
    this._translate.setDefaultLang(DEFAULT_LANGUAGE);
    if (selectedLanguage != null) {
      this._translate.use(selectedLanguage);
    }
  }

  private navigateHome(): void {
    this.router.navigate(['/home']);
  }

  applyData() {
    if (this.validations_form.invalid) {
      return;
    }
    this.userData.updateUserData(this.validations_form.value);
    this.navigateHome();
  }

  cancel() {
    this.navigateHome();
  }
  
  numberOnlyValidation(event: any) {
    const inputChar = String.fromCharCode(event.charCode);
    const value = parseInt(inputChar);
    if (isNaN(value)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }


}
