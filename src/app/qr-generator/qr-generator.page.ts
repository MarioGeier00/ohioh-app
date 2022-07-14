import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SocialSharing} from '@awesome-cordova-plugins/social-sharing/ngx';
import {QrcodeComponent} from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.page.html',
  styleUrls: ['./qr-generator.page.scss'],
})
export class QrGeneratorPage implements OnInit {

  @ViewChild(QrcodeComponent)
  qrCodeComponent: QrcodeComponent;

  qrGeneratorForm: FormGroup;
  qrCodeData: string;

  constructor(
    private formBuilder: FormBuilder,
    private socialSharing: SocialSharing
  ) {
  }

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

    this.qrCodeData = this.qrGeneratorForm.value;
  }

  share() {
    // @ts-ignore
    return this.socialSharing.share('OHIOH QR-Code', 'OHIOH QR-Code', this.qrCodeComponent.toDataURL);
  }

}
