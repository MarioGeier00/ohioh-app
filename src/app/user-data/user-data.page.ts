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

  public userDataForm: FormGroup;

  constructor(private router: Router,
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private _translate: TranslateService,
    private userData: UserService) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.userDataForm = this.formBuilder.group({
      prename: new FormControl('', Validators.nullValidator),
      name: new FormControl('', Validators.nullValidator),
      phone: new FormControl('', Validators.nullValidator),
      age: new FormControl('', Validators.compose([Validators.min(1), Validators.max(200), Validators.pattern('[0-9]*')])),
      residence: new FormControl('', Validators.nullValidator),
    });

    this.userData.getUser().then((user) => {
      if (user) {
        this.userDataForm.setValue(user);
      }
    });
  }

  ionViewDidEnter() {
    this._translate.setDefaultLang(DEFAULT_LANGUAGE);
    if (selectedLanguage != null) {
      this._translate.use(selectedLanguage);
    }
  }

  private navigateHome(): void {
    this.menuCtrl.enable(true);
    this.router.navigate(['/home']);
  }

  applyData() {
    if (this.userDataForm.invalid) {
      return;
    }
    this.userData.updateUserData(this.userDataForm.value);
    this.navigateHome();
  }

  cancel() {
    this.navigateHome();
  }

  numberOnlyValidation(event: any) {
    const inputChar = String.fromCharCode(event.charCode);
    // tslint:disable-next-line: radix
    const value = parseInt(inputChar);
    if (isNaN(value)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }


}
