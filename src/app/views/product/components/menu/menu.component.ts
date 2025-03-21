import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { isNil, remove, reverse } from 'lodash';
import {
  TreeviewI18n, TreeviewItem, TreeviewConfig, TreeviewHelper, TreeviewComponent,
  TreeviewEventParser, OrderDownlineTreeviewEventParser, DownlineTreeviewItem
} from 'ngx-treeview';
import { ProductService } from '../../../../_services/product/product.service';
import { LoaderService } from '../../../../_services/shared/loader.service';
@Injectable()
export class ProductTreeviewConfig  {
  hasAllCheckBox = false;
  hasFilter = true;
  hasCollapseExpand = false;
  maxHeight = 400;

}

@Component({
  //selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [
    { provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser },
    { provide: TreeviewConfig, useClass: ProductTreeviewConfig }
  ]
})
export class MenuComponent implements OnInit {
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm'
  };

  @ViewChild(TreeviewComponent) treeviewComponent: TreeviewComponent;

 // @ViewChild(LoaderComponent) private _child: LoaderComponent;
  items: Array<any> = [];;
  nodes: any[];
  dd: any;
  rows: string[];
  errorMessage: string;
  constructor(
    private service: ProductService,
    private _loaderservice: LoaderService

  ) { }

  ngOnInit() {
    this._loaderservice.showLoader();
    this.service.getProduct("").subscribe(data =>
      this.nodes = data, error =>
        this.errorMessage = error, () =>
        this.fillitemdata(),
    );

  }
  private fillitemdata(): void {
    this.nodes.forEach(item =>
      this.items.push(new TreeviewItem(item))
    );
    this._loaderservice.hideLoader();
  }

  onSelectedChange(downlineItems: DownlineTreeviewItem[]) {
    this.rows = [];
    downlineItems.forEach(downlineItem => {
      const item = downlineItem.item;
      const value = item.value;
      const texts = [item.text];
      let parent = downlineItem.parent;
      while (!isNil(parent)) {
        texts.push(parent.item.text);
        parent = parent.parent;
      }
      const reverseTexts = reverse(texts);
      const row = `${reverseTexts.join(' -> ')} : ${value}`;
      this.rows.push(row);
    });
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
