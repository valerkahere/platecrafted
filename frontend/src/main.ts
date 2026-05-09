import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Supports weights 100-900
import '@fontsource-variable/inter/wght.css';

bootstrapApplication(App, appConfig).catch((err) =>
  console.error(err),
);
