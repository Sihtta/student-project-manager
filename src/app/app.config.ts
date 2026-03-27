import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Rend le routing disponible dans l'application standalone
    importProvidersFrom(AppRoutingModule)
  ]
};
