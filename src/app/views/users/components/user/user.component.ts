import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../../../_models';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService, UserService } from '../../../../_services';

import { LoaderService } from '../../../../_services/shared/loader.service';
import { ConfirmWindowService } from '../../../../_services/shared/confirm-window.service';
import { NotificationService } from '../../../../_services/shared/notification.service';

import { ModalDismissReasons, NgbModal,NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

//import { ButtonModule,  CardModule, GridModule, ModalModule, PopoverModule, TooltipModule } from '@coreui/angular';

import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({ templateUrl: 'user.component.html' })
export class UserComponent implements OnInit {
  registerForm: FormGroup;
  public myUserModal;
  currentUser: User;
  users: User[] = [];
  loading = false;
  submitted = false;
  public visible = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private _loaderservice: LoaderService,
    private _confirmwindowservice: ConfirmWindowService,
    private notificationService: NotificationService,
    private http: HttpClient,
    private modalService: NgbModal,
    private activeModalService: NgbActiveModal,
  ) {
    this.currentUser =localStorage.getItem('currentUser')!=null? JSON.parse(localStorage.getItem('currentUser')||""):"";

  }

  ngOnInit() {
   
   this.loadAllUsers();
   
  }



  //     // convenience getter for easy access to form fields
  //  get f() { return this.registerForm.controls; }

  deleteUser(id: number) {


      this._confirmwindowservice.confirm( "Deactive this User? ",
      "Are you sure you want to deactive this user?","Delete","Cancel")
      .then((confirmed) => {
   if(confirmed){
      this.userService.delete(id).pipe(first()).subscribe(() => {
        this.notificationService.showMessage("User Delete"," User created successfully");
        this.loadAllUsers()
      });
  }
}
      );

  }

  private loadAllUsers() {
    this._loaderservice.showLoader();
   this.userService.getAll().subscribe(users => {
      this.users = users;
     this._loaderservice.hideLoader();
    });
  }


  // cretaeUser() {

  //   const initialState = {
  //     user: User,
  //     title: 'Create User',
  //     isCreate: true,
  //   };
  //   this.visible = true;
  //   //this.modalRef = this.modalService.show(ModalContentComponent, { initialState });
  //   //this.modalRef.content.closeBtnName = 'Close';



  // }
  closeResult = '';
	cretaeUser() {
    const initialState = {
      user: User,
      title: 'Create User',
      isCreate: true,
    };
    
		const modalRef=this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.user=User;
    modalRef.componentInstance.isCreate=true;
    modalRef.componentInstance.title='Create User';
	
	}
 

  editUser(_user: any) {

    // this.modalService.open(_user);
    // this.modalService.open(UserComponent);
    const initialState = {
      user: _user,
      title: 'Update User',
      isCreate: false
    };
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.user=_user;
    modalRef.componentInstance.title='Update User';
    modalRef.componentInstance.isCreate=false;
    console.log(_user);

  }
}



/* This is a component which we pass in modal*/

@Component({
  selector: 'modal-content',
  templateUrl: '_partial_user_entry.html'
})

export class ModalContentComponent implements OnInit {
  title: string;
  closeBtnName: string;
  userForm: FormGroup;
  loading = false;
  submitted = false;
  visible=false;
  user: User;
  isCreate: boolean;
  roles: Array<any> = [];
  constructor(private userService: UserService, private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private activeModalService: NgbActiveModal,
    //private modalService: BsModalService,
    private modalService: NgbModal,
    private notificationService: NotificationService) {
  };



  ngOnInit() {
    this.loadRoles();
    this.userForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      roleid: ['', Validators.required],
      username: ['',this.user.id > 0 ? '' : Validators.required],
      password: ['', (this.user!=undefined && this.user.id > 0) ? '' : [Validators.required, Validators.minLength(6)]],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  onCreate() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.userForm.value)
      .subscribe(
        data => {
          this.alertService.success('user create successful', true);
          this.activeModalService.close();
          if (this.user.id > 0) {
            this.notificationService.showMessage("User Update", this.user.username+" User updated successfully");
          } else {
            this.notificationService.showMessage("User Add", this.user.username +" User created successfully");
          }
          this.router.navigate(['/users/user']);

        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
  closeModal() {
    this.activeModalService.close();
  }
  private loadRoles() {
    this.userService.getRoles().subscribe(data =>
      this.roles = data
    );
  }
}
