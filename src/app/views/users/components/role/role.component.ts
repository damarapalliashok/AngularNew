import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { LoaderService } from '../../../../_services/shared/loader.service';

@Component({
  //selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  title = 'app';
  public gridApi;
  public gridColumnApi;
  public rowSelection;
  public paginationPageSize;
  TotalItems: number = 258;
  CurrentPage: number=1;
  PageSize: number;
  TotalPages: number;
  StartPage: number;
  EndPage: number;

  columnDefs = [
    {
      headerName: "#",
      width: 50,
      cellRenderer: function (params) {
        return parseInt(params.node.id) + 1;
      }
    },
    { headerName: 'Make', field: 'make', width: 100, editable: true, },
    { headerName: 'Model', field: 'model', editable: true, },
    { headerName: 'Price', field: 'price',  editable: true, }
  ];

  autoGroupColumnDef = {
  headerName: "Group",
    field: "Make",
  valueGetter: function (params) {
    if (params.node.group) {
      return params.node.key;
    } else {
      return params.data[params.colDef.field];
    }
  },
  headerCheckboxSelection: true,
  cellRenderer: "agGroupCellRenderer",
  cellRendererParams: { checkbox: true }
};


  


  rowData: any;

  constructor(private http: HttpClient, private _loaderservice: LoaderService) {
    this.paginationPageSize = 10;
  }

  ngOnInit() {
   // this._loaderservice.showLoader();
    this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
  
    this.getPagination(this.TotalItems, 1);

   // this._loaderservice.hideLoader();
  }

  createRange(start,end) {
    var items: number[] = [];
    for (var i = start; i <= end; i++) {
      items.push(i);
    }
    return items;
  }
  

  onGridReady(params) {
  //  this._loaderservice.showLoader();
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
  //  this._loaderservice.hideLoader();
  }
  onBtFirst() {
    this.getPagination(this.TotalItems, 1);
    this.gridApi.paginationGoToFirstPage();
  }

  onBtLast() {
    this.getPagination(this.TotalItems, this.TotalPages);
    this.gridApi.paginationGoToLastPage();
  }

  onBtNext(page) {
    this.getPagination(this.TotalItems, page);
    this.gridApi.paginationGoToNextPage();
  }

  onBtPrevious(page) {
    this.getPagination(this.TotalItems, page);
    this.gridApi.paginationGoToPreviousPage();
  }

  onBtPage(page) {
    this.getPagination(this.TotalItems, page);
    this.gridApi.paginationGoToPage(page-1);
  }





  getPagination(totalItems: number, page: number, pageSize: number= 10) {
    // calculate total, start and end pages
    var totalPages = Math.ceil(totalItems /pageSize);
    var currentPage = page != null ? page: 1;
    var startPage = currentPage - 5;
    var endPage = currentPage + 4;
    if (startPage <= 0) {
      endPage -= (startPage - 1);
      startPage = 1;
    }
    if (endPage > totalPages) {
      endPage = totalPages;
      if (endPage > 10) {
        startPage = endPage - 9;
      }
    }

    this.TotalItems = totalItems;
    this. CurrentPage = currentPage;
    this.StartPage = startPage;
    this.EndPage = endPage;
    this.PageSize = pageSize;
    this.TotalPages = totalPages;
  }
}
function setText(selector, text) {
  document.querySelector(selector).innerHTML = text;
}
