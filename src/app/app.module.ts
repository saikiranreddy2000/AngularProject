import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { FlightScheduleComponent } from './components/flight-schedule/flight-schedule.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { DatePipe } from '@angular/common';
import { SeatingLayoutComponent } from './components/seating-layout/seating-layout.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { PassengerentryComponent } from './components/passengerentry/passengerentry.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StaffComponent } from './components/staff/staff.component';
import { StaffDashboardComponent } from './components/staff-dashboard/staff-dashboard.component';
import { AncillaryServicesComponent } from './components/ancillary-services/ancillary-services.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InflightComponent } from './inflight/inflight.component';
import { CheckinComponent } from './components/checkin/checkin.component';
import { AdminPassengerComponent } from './components/admin-passenger/admin-passenger.component';
import { StaffaccessComponent } from './components/staffaccess/staffaccess.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    HomePageComponent,
    NavigationComponent,
    CarouselComponent,
    FooterComponent,
    FlightScheduleComponent,
    FlightDetailsComponent,
    SeatingLayoutComponent,
    UnauthorizedComponent,
    InventoryComponent,
    PassengerentryComponent,
    AdminComponent,
    AdminDashboardComponent,
    StaffComponent,
    StaffDashboardComponent,
    AncillaryServicesComponent,
    InflightComponent,
    CheckinComponent,
    AdminPassengerComponent,
    StaffaccessComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    NgbModule,
    NgbTooltipModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
