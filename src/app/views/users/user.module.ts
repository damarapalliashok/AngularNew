import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import{UserRoutingModule} from './user.routing.module'
import {CommonModule} from '@angular/common';
import { ReactiveFormsModule }    from '@angular/forms';

import { UserComponent, ModalContentComponent } from './components/user/user.component';
import { RoleComponent } from './components/role/role.component';
import { RegisterComponent } from './register.component';

// Modal Component
import { NgbModule ,NgbModalRef,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    UserRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AgGridModule,
    NgbModule,
  ],
  providers: [
    NgbActiveModal,
  ],
  declarations: [UserComponent, RoleComponent, RegisterComponent, ModalContentComponent],
  // entryComponents: [
  //  ModalContentComponent
  // ],

  schemas: [NO_ERRORS_SCHEMA]
})
export class UserModule { }
