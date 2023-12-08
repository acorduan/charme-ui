import { importProvidersFrom } from '@angular/core'
import { AppComponent } from './app/app.component'
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser'
import { CharmeUIProvider } from '@charme/ui/charme-config'
import { provideRouter } from '@angular/router'
import { routes } from './app/pages/pages.route'

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(routes),
    CharmeUIProvider({ defaultTheme: 'light' })
  ]

})
  .catch(err => console.error(err))
