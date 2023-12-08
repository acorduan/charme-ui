import { Routes } from '@angular/router'
import { PagesLayout } from './pages.layout'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'components',
    pathMatch: 'full'
  },

  {
    path: '',
    component: PagesLayout,
    children: [
      {
        path: 'components',
        loadChildren: async() => (await import('./components/components.route')).routes

      }

    ]
  }

]
