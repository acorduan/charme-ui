import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'components',
    pathMatch: 'full'
  },

  {
    path: 'components',
    loadChildren: async() => (await import('./components/components.route')).routes

  }

]
