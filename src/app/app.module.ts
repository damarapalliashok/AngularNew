import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { NgScrollbarModule } from 'ngx-scrollbar';

import { FormsModule }   from '@angular/forms';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';

import { LoginComponent } from './login';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { P404Component } from './views/error/404.component';
import { AlertService, AuthenticationService, UserService } from './_services';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationService } from './_services/authorization.service';
import { AuthorizationDataService } from './_services/authorization-data.service';
import { ProductService } from './_services/product/product.service';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { RouterModule } from '@angular/router';
import { LoaderComponent } from './views/shared/loader/loader-component'
import { LoaderService } from './_services/shared/loader.service';
import { ConfirmWindowComponent } from './views/shared/confirm-window/confirm-window.component';
import { ConfirmWindowService } from './_services/shared/confirm-window.service';
import { NotificationComponent } from './views/shared/notification/notification.component';
import { NotificationService } from './_services/shared/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,

 
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({

  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
 
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,
    HttpClientModule,
    RouterModule,
    NgbModule
  ],
  declarations: [AppComponent,
    LoginComponent, 
    AlertComponent,
    P404Component,
    AlertComponent,
    LoaderComponent,
    ConfirmWindowComponent,
    NotificationComponent,
    ...APP_CONTAINERS],
  providers: [
    AlertService,
    AuthGuard,
    AuthenticationService,
    AuthorizationService,
    AuthorizationDataService,
    ProductService,
    UserService,
    LoaderService,
    ConfirmWindowService,
    NotificationService,
    NgbModal ,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
      
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
   // fakeBackendProvider,
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
