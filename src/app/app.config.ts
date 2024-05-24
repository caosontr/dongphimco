import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // import provider

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()],
};


//Import config.ts
// Code service inject HttpClient => getProductList .get()
// call api page Home: ngOnInit (LifeCyle) -> chay UI render