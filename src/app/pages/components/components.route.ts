import { Routes } from '@angular/router'
import { ComponentsLayout } from './components.layout'

export const componentDocsPaths: Routes = [
  {
    path: 'accordion',
    loadComponent: async() => (await import('./accordion-doc/accordion-doc.component')).AccordionDocComponent
  },
  {
    path: 'alert',
    loadComponent: async() => (await import('./alert-doc/alert-doc.component')).AlertDocComponent
  },
  {
    path: 'alert-dialog',
    loadComponent: async() => (await import('./alert-dialog-doc/alert-dialog-doc.component')).AlertDialogDocComponent
  },
  {
    path: 'badge',
    loadComponent: async() => (await import('./badge-doc/badge-doc.component')).BadgeDocComponent
  },
  {
    path: 'button',
    loadComponent: async() => (await import('./button-doc/button-doc.component')).ButtonDocComponent
  },
  {
    path: 'checkbox',
    loadComponent: async() => (await import('./checkbox-doc/checkbox-doc.component')).CheckboxDocComponent
  },
  {
    path: 'combobox',
    loadComponent: async() => (await import('./combobox-doc/combobox-doc.component')).ComboboxDocComponent
  },
  {
    path: 'dialog',
    loadComponent: async() => (await import('./dialog-doc/dialog-doc.component')).DialogDocComponent
  },
  {
    path: 'disclosure',
    loadComponent: async() => (await import('./disclosure-doc/disclosure-doc.component')).DisclosureDocComponent
  },
  {
    path: 'ellipsis',
    loadComponent: async() => (await import('./ellipsis-doc/ellipsis-doc.component')).EllipsisDocComponent
  },
  {
    path: 'input',
    loadComponent: async() => (await import('./input-doc/input-doc.component')).InputDocComponent
  },
  {
    path: 'menu',
    loadComponent: async() => (await import('./menu-doc/menu-doc.component')).MenuDocComponent
  },
  {
    path: 'menu-bar',
    loadComponent: async() => (await import('./menu-bar-doc/menu-bar-doc.component')).MenuBarDocComponent
  },
  {
    path: 'popover',
    loadComponent: async() => (await import('./popover-doc/popover-doc.component')).PopoverDocComponent
  },
  {
    path: 'radio-group',
    loadComponent: async() => (await import('./radio-group-doc/radio-group-doc.component')).RadioGroupDocComponent
  },
  {
    path: 'separator',
    loadComponent: async() => (await import('./separator-doc/separator-doc.component')).SeparatorDocComponent
  },
  {
    path: 'switch',
    loadComponent: async() => (await import('./switch-doc/switch-doc.component')).SwitchDocComponent
  },
  {
    path: 'tooltip',
    loadComponent: async() => (await import('./tooltip-doc/tooltip-doc.component')).TooltipDocComponent
  }
]

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'accordion',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ComponentsLayout,
    children: componentDocsPaths
  }
]
