import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from '../profile/profile.component';
import {AuthGuard} from '../guards/auth.guard';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent,  pathMatch: 'full',  canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  exports: [RouterModule],
  declarations: []
})
export class RouteModule {
}
