import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.page.html',
  styleUrls: ['./qr-generator.page.scss'],
})
export class QrGeneratorPage implements OnInit {

  public name: string;
  public residence: string;

  constructor() { }

  ngOnInit() {
  }

  change() {

  }

}
