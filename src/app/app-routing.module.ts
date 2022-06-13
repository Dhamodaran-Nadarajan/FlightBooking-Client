import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirlineManagementComponent } from './airline-management/airline-management.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './_guards/auth.guard';
//import { AuthGuardService } from './_guards/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'airline',
    canActivate: [AuthGuard],
    component: AirlineManagementComponent,
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
