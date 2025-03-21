import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { RoleComponent } from './components/role/role.component';
import { RegisterComponent } from './register.component'
import { AuthGuard } from '../../_guards';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users'
    },
    children: [
      {
        path: 'user',
        component: UserComponent,
       // canActivate: [AuthGuard],
        data: {
          title: 'User',  perm: 'user' 
        }
      },
      {
        path: 'role',
        component: RoleComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Role', perm: 'role' 
        }
      }
    ]
  },


    {
      path: 'register',
      component: RegisterComponent,
      canActivate:[AuthGuard],
      data: {
        title: 'Register', perm: 'user' 
      }
    }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
