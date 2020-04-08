import { Component, OnInit } from '@angular/core';

import QRCode from 'qrcode';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.page.html',
  styleUrls: ['./qr-generator.page.scss'],
})
export class QrGeneratorPage implements OnInit {

  public name: string;
  public residence: string;

  generated = '';
  public displayQRCode: boolean;

  constructor() { }

  ngOnInit() {
  }

  generateQRCode() {
    const qrcode = QRCode;
    const self = this;
    qrcode.toDataURL(self.name, { errorCorrectionLevel: 'H' }, function (err, url) {
      self.generated = url;
    });
    
    this.displayQRCode = true;
  }

}
