import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuController, ToastController} from '@ionic/angular';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {UserService} from '../shared/data-services/user/user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.page.html',
  styleUrls: ['./user-data.page.scss'],
})
export class UserDataPage implements OnInit {

  readonly userDataForm = this.formBuilder.group({
    firstName: new FormControl('', Validators.maxLength(100)),
    lastName: new FormControl('', Validators.maxLength(100)),
    phone: new FormControl('', [Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'), Validators.maxLength(15)]),
    age: new FormControl(0, Validators.compose([Validators.min(1), Validators.max(200)])),
    city: new FormControl('', Validators.maxLength(30)),
    id: new FormControl(''),
  });

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private userData: UserService,
    public toastController: ToastController,
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    if (this.userData.isUserStored()) {
      this.userDataForm.setValue(this.userData.getUser());
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    await toast.present();
  }

  applyData() {
    if (this.userDataForm.invalid) {
      return;
    }
    // TODO: Add value validation
    // @ts-ignore
    this.userData.setUser(this.userDataForm.value)
      .then(
        () => this.navigateHome(),
        (err) => this.presentToast('Eingabe ist ungültig oder es ist ein Fehler aufgetreten: ' + err).then()
      );
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

  private navigateHome(): void {
    this.menuCtrl.enable(true);
    this.router.navigate(['/home']);
  }

}
