import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.page.html',
  styleUrls: ['./add-location.page.scss'],
})
export class AddLocationPage {

  readonly addLocationForm = this.formBuilder.group({
    street: new FormControl('', Validators.compose([Validators.required, Validators.min(1), Validators.max(40)])),
    zipCode: new FormControl('', Validators.compose([Validators.required, Validators.min(1), Validators.max(20)])),
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  addLocation() {
    // TODO: Validation
    if (!this.addLocationForm.valid) {
      return;
    }
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

  private navigateHome(): void {
    this.router.navigate(['/home']);
  }

}
