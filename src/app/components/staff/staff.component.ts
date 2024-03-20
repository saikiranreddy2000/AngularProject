import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/services/flight.service';
import { SeatingService } from 'src/app/services/seating.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  flightData: any;
  filteredFlights: any = [];
  flightNumber: any = null;

  constructor(
    private flightService: FlightService,
    private datePipe: DatePipe,
    private router: Router,
    private seatingService: SeatingService
  ) {}

  ngOnInit(): void {
    this.flightService.getFlightData().subscribe(
      (data:any) => {
        this.flightData = data       
      },
      (err:any) => {
        alert('something went wrong!');
      }
    );
  }

  getCurrentDate() {
    return new Date();
  }
  formateDate(date: Date) {
    return this.datePipe.transform(date, 'EE,d MMM yy');
  }
  formateTime(date: Date) {
    return this.datePipe.transform(date, 'hh:mm a');
  }
  navigateToSeatingLayout(flightCode: any) {
    this.router.navigate(['/home/staffdashboard']);
    this.seatingService.setFlightNumber(flightCode);
    this.flightNumber = flightCode;
    console.log('flightnumber:', this.flightNumber);
  }

}
