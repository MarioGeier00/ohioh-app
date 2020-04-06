import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LanguageTranslatorService {

  constructor(
    private translator: TranslateService,
    private http: HttpClient,
    private storage: Storage
  ) { }

  static readonly DEFAULT_LANGUAGE = 'de';
  private selectedLanguage: string = null;

  createTranslateLoader() {
    return new TranslateHttpLoader(this.http, './assets/i18n/', '.json');
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

}
