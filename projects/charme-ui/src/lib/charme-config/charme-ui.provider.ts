import { APP_INITIALIZER } from '@angular/core'
import { CharmeThemeService } from './charme-theme.service'
import { CharmeConfig } from './charme-theme.model'

export const CharmeUIProvider = function(config?: CharmeConfig) {
  return {
    provide: APP_INITIALIZER,
    useFactory: (service: CharmeThemeService) => () => service.init(config),
    deps: [CharmeThemeService],
    multi: true
  }
}
