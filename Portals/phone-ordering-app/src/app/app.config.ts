import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { apolloProviders } from './graphql.config'; // 👈 Your Apollo setup
import { MaterialModule } from './shared/material.module'; // 👈 Your optional Material imports

export const appConfig = {
  providers: [
    
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    apolloProviders, // 👈 Your Apollo setup    
    //importProvidersFrom(MaterialModule) // ✅ Optional but helpful for Material components




  ]
};
