import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const DEFAULT_LANGUAGE = 'de';
export let selectedLanguage = null;
export function changeSelectedLanguage(language: string) {
    selectedLanguage = language;
}

