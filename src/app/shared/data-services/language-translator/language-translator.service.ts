import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateService} from '@ngx-translate/core';
import {AlertController} from '@ionic/angular';
import {StorageService} from '../../storage.service';

const DEFAULT_LANGUAGE = 'de';

@Injectable({
  providedIn: 'root'
})
export class LanguageTranslatorService {

  private readonly prototypeInfoListDE = `
  <ul>
    <li>
      Um alle Features testen zu können, <b>lade die Android App herunter</b> (Menu > App herunterladen)
    </li>
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

  private readonly prototypeInfoListEN = `
  <ul>
    <li>
      To test all features, <b>please download the android app</b> (Menu > Download App)
    </li>
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


  private selectedLanguage: string = null;

  constructor(
    private translator: TranslateService,
    private http: HttpClient,
    private storageService: StorageService,
    public alertController: AlertController,
  ) {
  }

  async presentInfoAlert() {
    const alert = await this.alertController.create({
      header: 'Prototype App',
      message: DEFAULT_LANGUAGE,
      buttons: ['OK']
    });

    await alert.present();
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

  public getSelectedLanguageOrDefault(): string {
    if (this.selectedLanguage) {
      return this.selectedLanguage;
    } else {
      return DEFAULT_LANGUAGE;
    }
  }

  changeSelectedLanguage(language: string) {
    this.selectedLanguage = language;
    this.translator.use(this.selectedLanguage).toPromise();
    this.storageService.set('lang', language);
  }

  loadSelectedLanguagePromise() {
    return this.storageService.get('lang');
  }

  loadSelectedLanguage(): Promise<void> {
    return this.loadSelectedLanguagePromise().then(
      storedSelection => {
        this.selectedLanguage = storedSelection;
      }
    );
  }

  async initLanguageTranslator() {
    this.translator.setDefaultLang(DEFAULT_LANGUAGE);
    if (!this.selectedLanguage) {
      await this.loadSelectedLanguage();
    } else {
      await this.translator.use(this.selectedLanguage).toPromise();
    }
  }


  public getPrototypeInfoText(): string {
    if (this.selectedLanguage === 'de') {
      return this.prototypeInfoListDE;
    }
    return this.prototypeInfoListEN;
  }

}
