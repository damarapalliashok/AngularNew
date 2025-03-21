//import { Directive, ElementRef, OnInit, Input } from '@angular/core';
//import { AuthorizationService } from '../../_services/authorization.service';
//import { AuthGroup } from '../../_models/authorization.types';

//@Directive({
//  selector: '[myHideIfUnauthorized]'
//})
//export class MyHideIfUnauthorizedDirective implements OnInit {
//  @Input('myHideIfUnauthorized') permission: AuthGroup; // Required permission passed in
//  constructor(private el: ElementRef, private authorizationService: AuthorizationService) { }
//  ngOnInit() {
//    if (!this.authorizationService.hasPermission(this.permission)) {
//      this.el.nativeElement.style.display = 'none';
//    }
//  }
//}


////Usage
////<div[myHideIfUnauthorized]="updatePermission" > <!--a property set or passed into the component –>
////  <div[myDisableIfUnauthorized]="updatePermission" >
