import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { MatPaginatorIntl } from '@angular/material/paginator';

import { routes } from './app.routes';
import { authInterceptor } from './auth/interceptors/auth-interceptor';
import { getFrenchPaginatorIntl } from './common/custom-paginator';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: getFrenchPaginatorIntl(),
    },

    provideRouter(routes),

    provideHttpClient(withInterceptors([authInterceptor])),

    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'fr',
      lang: 'fr',
    }),
  ],
};
