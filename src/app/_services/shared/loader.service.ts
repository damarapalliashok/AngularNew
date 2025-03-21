import { Component, ViewChild, Injectable } from '@angular/core';
import { NgbModal,NgbModalRef   } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from '../../views/shared/loader/loader-component';

@Injectable()
export class LoaderService {
  constructor( private modalService: NgbModal) {
  }

  modalReference: NgbModalRef; 
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm'
  };
  showLoader() {
    this.modalReference=this.modalService.open(LoaderComponent,this.config);

  }
  hideLoader() {
   // document.body.className = document.body.className.replace(/ ?modal-open/, '');
    this.modalReference.close();

  }
}
