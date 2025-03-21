import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartJSComponent } from './chartjs.component';
import { AuthGuard } from './../../_guards';

const routes: Routes = [
  {
    path: 'charts',
    component: ChartJSComponent,
    canActivate:[AuthGuard],
    data: {
      title: 'Charts',perm: 'charts' 
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartJSRoutingModule {}
