import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirlineManagementComponent } from './airline-management/airline-management.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { BookingComponent } from './booking/booking.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { ScheduleAirlineComponent } from './schedule-airline/schedule-airline.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './_guards/auth.guard';
//import { AuthGuardService } from './_guards/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'navbar', component: NavComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  {
    path: 'scheduleAirline',
    canActivate: [AuthGuard],
    component: ScheduleAirlineComponent,
  },
  {
    path: 'airline',
    canActivate: [AuthGuard],
    component: AirlineManagementComponent,
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'booking',
    canActivate: [AuthGuard],
    component: BookingComponent,
  },
  {
    path: 'history',
    canActivate: [AuthGuard],
    component: BookingHistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
