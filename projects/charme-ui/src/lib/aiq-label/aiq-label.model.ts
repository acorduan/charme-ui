export const aiqLabelModel = ['information', 'success', 'critical', 'warning', 'default'] as const;
export type AiqLabelType = typeof aiqLabelModel[number];
