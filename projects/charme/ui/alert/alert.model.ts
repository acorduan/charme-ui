export const alertSeverities = ['success', 'warning', 'error', 'info'] as const
export type AlertSeverity = typeof alertSeverities[number]
