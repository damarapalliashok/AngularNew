import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';
import { PermissionComponent } from './components/permission/permission.component';
import { AuthGuard } from './../../_guards';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Product'
    },
    children: [
      {
        path: 'menu',
        component: MenuComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Menus', perm: 'menu'
        }
      },
      {
        path: 'permission',
        component: PermissionComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Permission', perm: 'permission'
        }
      }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  MenuRoutingModule { }
