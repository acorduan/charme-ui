import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { CharmeUIProvider } from '@charme-ui'


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    CharmeUIProvider({defaultTheme: 'light'}),

  ],

})
  .catch(err => console.error(err));
