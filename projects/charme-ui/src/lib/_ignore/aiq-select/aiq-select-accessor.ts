import {InjectionToken} from '@angular/core';

export interface AiqSelectAccessor {
  multiple?: boolean;
}

export const AIQ_SELECT_ACCESSOR = new InjectionToken<AiqSelectAccessor>(
  'AIQ_SELECT_ACCESSOR',
);