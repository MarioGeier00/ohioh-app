import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Globalization } from '@ionic-native/globalization/ngx';

@Injectable({
  providedIn: 'root'
})
export class LanguageTranslatorService {

  private readonly PrototypeInfoList_DE = `
  <ul>
    <li>
      Diese App befindet sich im Entwicklungszustand
    </li>
    <li>
      Diese App besitzt keine Backend-/Datenanbindung
    </li>
    <li>
      Es werden keine perönlichen Daten gesendet
    </li>
    <li>
      Die Erfassung und lokale Speicherung der GPS Daten funktioniert
    </li>
    <li>
      Es können QR-Codes erstellt und auf dem Mobilgerät eingelesen werden
    </li>
  </ul>
  `;

  private readonly PrototypeInfoList_EN = `
  <ul>
    <li>
      This app is in developement
    </li>
    <li>
      This app is not connected to any Backend
    </li>
    <li>
      No personal data is beeing sent
    </li>
    <li>
      The capture and the storage on the phone of GPS data is working
    </li>
    <li>
      QR-Codes can be created and scanned on a mobile device
    </li>
  </ul>
  `;


  static DEFAULT_LANGUAGE = 'de';
  private selectedLanguage: string = null;

  constructor(
    private translator: TranslateService,
    private globalization: Globalization,
    private http: HttpClient,
    private storage: Storage
  ) {
    this.globalization.getPreferredLanguage()
      .then(res => console.log(res))
      .catch(e => console.log(e));
      LanguageTranslatorService.DEFAULT_LANGUAGE = 'de';
  }

  createTranslateLoader() {
    return new TranslateHttpLoader(this.http, './assets/i18n/', '.json');
  }

  public get(key: string): string {
    return this.translator.instant(key);
  }

  public getSelectedLanguage(): string {
    return this.selectedLanguage;
  }

  changeSelectedLanguage(language: string) {
    this.selectedLanguage = language;
    this.translator.use(this.selectedLanguage).toPromise();
    this.storage.set('lang', language);
  }

  loadSelectedLanguagePromise(): Promise<string> {
    return this.storage.get('lang');
  }

  loadSelectedLanguage(): Promise<void> {
    return this.loadSelectedLanguagePromise().then(
      storedSelection => {
        this.selectedLanguage = storedSelection;
      }
    );
  }

  async initLanguageTranslator() {
    this.translator.setDefaultLang(LanguageTranslatorService.DEFAULT_LANGUAGE);
    if (!this.selectedLanguage) {
      await this.loadSelectedLanguage();
    }

    if (this.selectedLanguage) {
      await this.translator.use(this.selectedLanguage).toPromise();
    }
  }




  public getPrototypeInfoText(): string {
    if (this.selectedLanguage === 'de') {
      return this.PrototypeInfoList_DE;
    }
    return this.PrototypeInfoList_EN;
  }

}
