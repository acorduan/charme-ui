import { importProvidersFrom } from '@angular/core'
import { AppComponent } from './app/app.component'
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CharmeUIProvider } from '../projects/charme-old/core'

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    CharmeUIProvider({ defaultTheme: 'light' }),
    ReactiveFormsModule,
    FormsModule

  ]

})
  .catch(err => console.error(err))
