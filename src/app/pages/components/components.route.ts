import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'button',
    pathMatch: 'full'
  },
  {
    path: 'button',
    loadComponent: async() => (await import('./button-doc/button-doc.component')).ButtonDocComponent
  }

]
