export const charmeThemes = ['dark', 'light'] as const
export type CharmeTheme = typeof charmeThemes[number]
export interface CharmeConfig { defaultTheme: CharmeTheme }
