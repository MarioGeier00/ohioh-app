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
      age: new FormControl('', Validators.min(1)),
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

  cancel() {
    this.navigateHome();
  }

}
