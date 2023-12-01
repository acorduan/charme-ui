import { APP_INITIALIZER, Provider } from '@angular/core'
import { CharmeThemeService } from './charme-theme.service'
import { CharmeConfig } from './charme-theme.model'

export const CharmeUIProvider = function(config?: CharmeConfig): Provider {
  return {
    provide: APP_INITIALIZER,
    useFactory: (service: CharmeThemeService) => () => service.init(config),
    deps: [CharmeThemeService],
    multi: true
  }
}
