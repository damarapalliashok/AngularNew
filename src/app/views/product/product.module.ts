import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MenuRoutingModule } from '././product-routing.module'
import { CommonModule } from '@angular/common';
import { TreeviewModule } from 'ngx-treeview';
import { MenuComponent } from './components/menu/menu.component';
import { PermissionComponent } from './components/permission/permission.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../_directives';


@NgModule({
  imports: [
    TreeviewModule.forRoot(),
    MenuRoutingModule,
    FormsModule,
    CommonModule
  ],
  declarations: [MenuComponent, PermissionComponent],
  //bootstrap: [MenuComponent],
  entryComponents: [
    
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProductModule { }
