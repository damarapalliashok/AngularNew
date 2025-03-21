
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { isNil, remove, reverse } from 'lodash';
import {
  TreeviewI18n, TreeviewItem, TreeviewConfig, TreeviewHelper, TreeviewComponent,
  TreeviewEventParser, OrderDownlineTreeviewEventParser, DownlineTreeviewItem
} from 'ngx-treeview';
import { ProductService } from '../../../../_services/product/product.service';
import { LoaderService } from '../../../../_services/shared/loader.service';
import { first } from 'rxjs/operators';
import { Product } from '../../../../_models/product/product';
import { AlertService } from '../../../../_services';
import { NotificationService } from '../../../../_services/shared/notification.service';

@Injectable()
export class ProductTreeviewConfig  {
  hasAllCheckBox = true;
  hasFilter = true;
  hasCollapseExpand = false;
  decoupleChildFromParent=false;
  maxHeight = 4000;
}

@Component({
  //selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
  providers: [
    { provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser },
    { provide: TreeviewConfig, useClass: ProductTreeviewConfig }
  ]
})
export class PermissionComponent implements OnInit {
  @ViewChild(TreeviewComponent) treeviewComponent: TreeviewComponent;
  items: Array<any> = [];
  nodes: any[];
  rows: string[];
  errorMessage: string;
  roles: Array<any> = [];
  selectedRole: string;
  selectedIds: number[];

  constructor(
    private service: ProductService,
    private _loaderservice: LoaderService,
    private alertService: AlertService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {

    this.loadRoles();
  }


  onRoleChange(roleid) {
    this._loaderservice.showLoader();
    this.items = [];
      this.service.getProduct(roleid).subscribe(data =>
        this.nodes = data, error =>
          this.errorMessage = error, () =>
          this.fillitemdata(),
      );
    }
 

  private loadRoles() {
    this.service.getRoles().subscribe(data =>
      this.roles = data
      );
  }


  private fillitemdata(): void {
    this.nodes.forEach(item =>
      this.items.push(new TreeviewItem(item))
    );
    this._loaderservice.hideLoader();
  }


  updatePermission() {
    this._loaderservice.showLoader();
    var model = new Product();
    model.SelectedIds = this.selectedIds;
    this.service.updatePermissions(this.selectedRole, model).subscribe(
      data => {
        this._loaderservice.hideLoader();

        this.notificationService.showMessage("Product Update", "product permission updated successfully");
      });
   
  }

  reset() {
    this.items = [];
  }


  onSelectedChange(downlineItems: DownlineTreeviewItem[]) {
    this.selectedIds = [];
    downlineItems.forEach(downlineItem => {
      const item = downlineItem.item;
      const value = item.value;
      let parent = downlineItem.parent;
      this.selectedIds.push(value);

      while (!isNil(parent)) {
        if (this.selectedIds.indexOf(parent.item.value) == -1) {
          this.selectedIds.push(parent.item.value);
        }
        parent = parent.parent;
      }
   
    });

    //this.rows = [];
    //downlineItems.forEach(downlineItem => {
    //  const item = downlineItem.item;
    //  const value = item.value;
    //  const texts = [item.text];
    //  let parent = downlineItem.parent;
    //  while (!isNil(parent)) {
    //    texts.push(parent.item.text);
    //    parent = parent.parent;
    //  }
    //  const reverseTexts = reverse(texts);
    //  const row = `${reverseTexts.join(' -> ')} : ${value}`;
    //  this.rows.push(row);
    //});
  }

  removeItem(item: TreeviewItem) {
    let isRemoved = false;
    for (const tmpItem of this.items) {
      if (tmpItem === item) {
        remove(this.items, item);
      } else {
        isRemoved = TreeviewHelper.removeItem(tmpItem, item);
        if (isRemoved) {
          break;
        }
      }
    }

    if (isRemoved) {
      this.treeviewComponent.raiseSelectedChange();
    }
  }
}
