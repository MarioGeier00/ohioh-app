import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {


  public languages = [
    { name: 'Deutsch', id: 'de' },
    { name: 'Englisch', id: 'en' },
    { name: 'Türkisch', id: 'tr' },
    { name: 'Russisch', id: 'ru' },
    { name: 'Polnisch', id: 'pl' },
    { name: 'Arabisch', id: 'sa' },
    { name: 'Kurdisch', id: 'ku' }
  ];

  constructor() { }

  ngOnInit() {}

}
