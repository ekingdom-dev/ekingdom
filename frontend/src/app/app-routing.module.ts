import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'front',
        loadChildren: './modules/front/front.module#FrontModule'
      }
    ]
  }
];
