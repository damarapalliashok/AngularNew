import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
//import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificationComponent } from '../../views/shared/notification/notification.component';
import { NgbModal,NgbModalRef   } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private modalService: NgbModal) {
  }

  modalReference: NgbModalRef; 

  showMessage(title, message) {

    const modalRef = this.modalService.open(NotificationComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;

    return modalRef.result;
 
  }
  hideMessage() {
   // document.body.className = document.body.className.replace(/ ?modal-open/, '');
    this.modalReference.close();

  }
 
}
