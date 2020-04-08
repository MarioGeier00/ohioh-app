import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-language-flag',
  templateUrl: './language-flag.component.html',
  styleUrls: ['./language-flag.component.scss'],
})
export class LanguageFlagComponent implements OnInit {

  @Input()
  public language: string;

  constructor() { }

  ngOnInit() {}

}
