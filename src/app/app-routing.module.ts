import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'geo',
    loadChildren: () => import('./geolocation-test/geolocation-test.module').then(m => m.GeolocationTestPageModule)
  },
  {
    path: 'user-data',
    loadChildren: () => import('./user-data/user-data.module').then(m => m.UserDataPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'credits',
    loadChildren: () => import('./credits/credits.module').then(m => m.CreditsPageModule)
  },
  {
    path: 'qr-scanner',
    loadChildren: () => import('./qr-scanner/qr-scanner.module').then(m => m.QrScannerPageModule)
  },
  {
    path: 'data-protection',
    loadChildren: () => import('./data-protection/data-protection.module').then(m => m.DataProtectionPageModule)
  },
  {
    path: 'infection-warning',
    loadChildren: () => import('./infection-warning/infection-warning.module').then(m => m.InfectionWarningPageModule)
  },
  {
    path: 'qr-generator',
    loadChildren: () => import('./qr-generator/qr-generator.module').then(m => m.QrGeneratorPageModule)
  },
  {
    path: 'add-location',
    loadChildren: () => import('./add-location/add-location.module').then(m => m.AddLocationPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
