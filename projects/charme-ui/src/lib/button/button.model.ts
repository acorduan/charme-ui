export const buttonSizes = ['sm', 'md', 'lg', 'sm-icon', 'md-icon', 'lg-icon'] as const
export type ButtonSize = typeof buttonSizes[number];

export const buttonColors = ['primary', 'success', 'warning', 'error'] as const;
export type ButtonColor = typeof buttonColors[number];

export const buttonTypes = ['plain', 'outline', 'flat'] as const;
export type ButtonType = typeof buttonTypes[number];
