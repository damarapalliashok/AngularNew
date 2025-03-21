﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable,pipe } from 'rxjs';
import {map, first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';

@Component({templateUrl: 'login.component.html'})


export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
       this.authenticationService.login(this.f.username.value, this.f.password.value)
      
    }
        // .pipe(first())
        // .map(
        //         data => {
        //             console.log(data.status)
        //             if(data.status==1){
        //                 this.alertService.error("Invalid UserName/Password");

        //             }else if(data.status==2){
        //                 this.alertService.error("Invalid Password");
        //             }else if(data.status==3){
        //                 this.alertService.error("User locked , please contract administartor");
        //             }
        //             else{
        //             this.router.navigate([this.returnUrl]);
        //             }
        //             this.loading = false;
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
        //     }
}
