import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouteModule } from './route/route.module';
import {ValidateService} from './services/validate.service';
import {FlashMessagesModule} from 'angular2-flash-messages/module/module';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouteModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
