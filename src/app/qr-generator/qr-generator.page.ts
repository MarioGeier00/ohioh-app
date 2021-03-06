import { Component, OnInit } from '@angular/core';

import QRCode from 'qrcode';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.page.html',
  styleUrls: ['./qr-generator.page.scss'],
})
export class QrGeneratorPage implements OnInit {

  public qrGeneratorForm: FormGroup;

  public generatedQRCode = '';
  public displayQRCode: boolean;


  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.qrGeneratorForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.max(40)])),
      street: new FormControl('', Validators.compose([Validators.required, Validators.min(1), Validators.max(40)])),
      zipCode: new FormControl('', Validators.compose([Validators.required, Validators.min(1), Validators.max(20)])),
    });

  }

  generateQRCode() {
    if (!this.qrGeneratorForm.valid) {
      return;
    }

    // TODO: Check for XSS input
    const self = this;
    QRCode.toDataURL(JSON.stringify(this.qrGeneratorForm.value), { errorCorrectionLevel: 'H' }, function (err, url) {
      self.generatedQRCode = url;
    });

    this.displayQRCode = true;
  }

  share() {
    SocialSharing.share('OHIOH QR-Code', 'OHIOH QR-Code', this.generatedQRCode);
  }

}
