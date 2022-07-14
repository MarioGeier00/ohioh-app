import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-language-flag',
  templateUrl: './language-flag.component.html',
  styleUrls: ['./language-flag.component.scss'],
})
export class LanguageFlagComponent {

  @Input()
  public language: string;

}
