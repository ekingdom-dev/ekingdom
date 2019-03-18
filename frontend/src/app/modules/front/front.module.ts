import { FrontComponent } from './front.component';
import { NgModule } from '@angular/core';
import { GameBrowserComponent } from './containers/game-browser/game-browser.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { frontModuleRoutes } from './front-routing.module';
import { VillageDialogtipComponent } from './containers/game-browser/village-dialogtip/village-dialogtip.component';

@NgModule({
  declarations: [
    FrontComponent,
    GameBrowserComponent,
    VillageDialogtipComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(frontModuleRoutes)
  ],
  providers: []
})

export class FrontModule { }
