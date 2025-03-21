import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  title: string;
  message: string;
  ngOnInit() {
  }

  constructor(
    private activeModal: NgbActiveModal
  ) { }
  public dismiss() {
    this.activeModal.dismiss();
  }
}
