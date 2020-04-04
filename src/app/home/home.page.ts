import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ToastController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private menuCtrl: MenuController,
    private router: Router) {
    this.menuCtrl.enable(true);
  }
  
  ngOnInit() {
  }

  openQRScan() {
    this.router.navigate(['/qr-scanner']);
  }

  openInfectionWarning() {
    this.router.navigate(['/infection-warning']);
  }
}
