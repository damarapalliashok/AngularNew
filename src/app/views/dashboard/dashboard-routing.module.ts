import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from './../../_guards';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
   canActivate:[AuthGuard],
    data: {
      title: $localize`Dashboard`//,perm: 'Dashboard' 
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
