import { effect, Injectable, signal } from '@angular/core'
import { charmeThemes, CharmeTheme, CharmeConfig } from './charme-theme.model'

const LOCAL_STORAGE_KEY = 'charme-theme'

@Injectable({
  providedIn: 'root'
})
export class CharmeThemeService {
  private readonly theme = signal<CharmeTheme | undefined>(undefined)

  constructor() {
    effect(() => {
      charmeThemes.forEach(theme => document.documentElement.classList.remove(theme))
      const theme = this.theme()
      if (theme !== undefined) {
        document.documentElement.classList.add(theme)
        localStorage.setItem(LOCAL_STORAGE_KEY, theme)
      }
    })
  }

  init(config?: CharmeConfig): void {
    const theme: CharmeTheme | undefined = localStorage.getItem(LOCAL_STORAGE_KEY) as CharmeTheme | null ?? config?.defaultTheme ?? 'light'
    this.theme.set(theme)
  }

  toggle(): void {
    this.theme.set(this.theme() === 'dark' ? 'light' : 'dark')
  }

  set(value: CharmeTheme | undefined): void {
    this.theme.set(value)
  }

  get(): CharmeTheme | undefined {
    return this.theme()
  }
}
