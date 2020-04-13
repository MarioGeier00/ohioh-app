import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.page.html',
  styleUrls: ['./add-location.page.scss'],
})
export class AddLocationPage implements OnInit {

  public addLocationForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.addLocationForm = this.formBuilder.group({
      street: new FormControl('', Validators.compose([Validators.required, Validators.min(1), Validators.max(40)])),
      zipCode: new FormControl('', Validators.compose([Validators.required, Validators.min(1), Validators.max(20)])),
    });

  }

  private navigateHome(): void {
    this.router.navigate(['/home']);
  }

  applyData() {
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

}
