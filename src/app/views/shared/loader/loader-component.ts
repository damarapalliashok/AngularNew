import { Component, ViewChild } from '@angular/core';


@Component({
 selector: 'loader-modal-static',
  templateUrl: 'loader-component.html',
  styleUrls: ['loader-component.scss']
})
export class LoaderComponent {


  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm'
  };
}



