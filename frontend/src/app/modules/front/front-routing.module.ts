import { Routes } from '@angular/router';
import { FrontComponent } from './front.component';
import { GameBrowserComponent } from './containers/game-browser/game-browser.component';

export const frontModuleRoutes: Routes = [
  {
    path: '',
    component: FrontComponent,
    children: [
      {
        path: 'game-browser',
        component: GameBrowserComponent
      }
    ]
  }
];
