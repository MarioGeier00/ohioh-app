import { Component, OnInit } from '@angular/core';

import QRCode from 'qrcode';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.page.html',
  styleUrls: ['./qr-generator.page.scss'],
})
export class QrGeneratorPage implements OnInit {

  public userDataForm: FormGroup;

  generated = '';
  public displayQRCode: boolean;


  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.userDataForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.max(40)])),
      street: new FormControl('', Validators.compose([Validators.required, Validators.min(1), Validators.max(40)])),
      zipCode: new FormControl('', Validators.compose([Validators.required, Validators.min(1), Validators.max(20)])),
    });

  }

  generateQRCode() {
    QRCode.toDataURL(JSON.stringify(this.userDataForm.value), { errorCorrectionLevel: 'H' }, function (err, url) {
      this.generated = url;
    });
    
    this.displayQRCode = true;
  }

}
