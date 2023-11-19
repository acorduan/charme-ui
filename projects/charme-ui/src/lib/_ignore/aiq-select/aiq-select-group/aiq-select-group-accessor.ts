import {InjectionToken} from '@angular/core';

export interface AiqSelectGroupAccessor {
  disabled?: boolean
}

export const AIQ_SELECT_GROUP_ACCESSOR = new InjectionToken<AiqSelectGroupAccessor>(
  'AIQ_SELECT_GROUP_ACCESSOR',
);