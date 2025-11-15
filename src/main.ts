import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * Application Bootstrap
 * Entry point for the Angular application
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
