import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.page.html',
  styleUrls: ['./user-data.page.scss'],
})
export class UserDataPage implements OnInit {

  constructor(private router: Router,
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder) {
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

  private navigateHome(): void {
    this.router.navigate(['/home']);
  }

  applyData() {
    if (this.validations_form.invalid) {
      return;
    }
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

  cancel() {
    this.navigateHome();
  }

}
