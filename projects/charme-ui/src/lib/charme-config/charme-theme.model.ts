export const charmeThemes = ['dark', 'light'] as const;
export type CharmeTheme = typeof charmeThemes[number];
export type CharmeConfig = {defaultTheme: CharmeTheme}
