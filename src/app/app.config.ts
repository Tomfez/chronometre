import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routeConfig } from './app.routes'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routeConfig),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    // {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
  ]
};
