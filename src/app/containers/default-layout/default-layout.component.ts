import { Component,OnInit } from '@angular/core';

import { navItems } from './_nav';
import { User } from '../../_models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent{
  currentUser: User;
  public navItems;
  constructor(){
  this.currentUser =localStorage.getItem('currentUser')!=null? JSON.parse(localStorage.getItem('currentUser') ||""):"";
  this. navItems = localStorage.getItem('usermenu')!=null?JSON.parse(localStorage.getItem('usermenu')||""):"";
  //public navItems = navItems;
  }


  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

}
