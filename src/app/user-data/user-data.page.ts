import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../shared/data-services/user-service/user.service';
import { LanguageTranslatorService } from '../shared/data-services/language-translator/language-translator.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.page.html',
  styleUrls: ['./user-data.page.scss'],
})
export class UserDataPage implements OnInit {

  public userDataForm: FormGroup;

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private userData: UserService,
    private translation: LanguageTranslatorService
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.translation.initLanguageTranslator().then();

    this.userDataForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.maxLength(100)),
      lastName: new FormControl('', Validators.maxLength(100)),
      phone: new FormControl('', Validators.compose([Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'), Validators.maxLength(15)])),
      age: new FormControl('', Validators.compose([Validators.min(1), Validators.max(200)])),
      city: new FormControl('', Validators.maxLength(30)),
    });
    this.userData.getUser().then((user) => {
      if (user) {
        this.userDataForm.setValue(user);
      }
    });
  }

  ionViewDidEnter() {

  }

  private navigateHome(): void {
    this.menuCtrl.enable(true);
    this.router.navigate(['/home']);
  }

  applyData() {
    if (this.userDataForm.invalid) {
      return;
    }
    this.userData.updateUserData(this.userDataForm.value).then(() => this.navigateHome());
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
