import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { FlightScheduleComponent } from './components/flight-schedule/flight-schedule.component';
import { SeatingLayoutComponent } from './components/seating-layout/seating-layout.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { PassengerentryComponent } from './components/passengerentry/passengerentry.component';
import { AuthGuard } from './components/login-page/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { StaffDashboardComponent } from './components/staff-dashboard/staff-dashboard.component';
import { StaffComponent } from './components/staff/staff.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AncillaryServicesComponent } from './components/ancillary-services/ancillary-services.component';
import { InflightComponent } from './inflight/inflight.component';
import { CheckinComponent } from './components/checkin/checkin.component';
import { AdminPassengerComponent } from './components/admin-passenger/admin-passenger.component';
import { StaffaccessComponent } from './components/staffaccess/staffaccess.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      { path: '', component: CarouselComponent },
      {
        path: 'inventory',
        component: InventoryComponent,
      },
      {
        path: 'ancillary',
        component: AncillaryServicesComponent,
      },
      {
        path: 'adm',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin'] },
      },
      { path: 'admindashboard', component: AdminDashboardComponent },
      { path: 'adminpassengerData', component: AdminPassengerComponent },
      { path: 'staffaccess', component: StaffaccessComponent },
      {
        path: 'staff',
        component: StaffComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Staff'] },
      },
      { path: 'staffdashboard', component: StaffDashboardComponent },
      { path: 'inflight', component: InflightComponent },
      { path: 'checkin', component: CheckinComponent },
    ],
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
