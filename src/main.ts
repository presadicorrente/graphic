import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));


/** 
 * 
 * ng build --configuration production --base-href /graphic/
 * npx angular-cli-ghpages --dir=dist/graphic/browser
 */
