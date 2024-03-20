import { Component, OnInit, ElementRef } from '@angular/core';
import { FlightService } from 'src/app/services/flight.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SeatingService } from 'src/app/services/seating.service';

@Component({
  selector: 'app-flight-schedule',
  templateUrl: './flight-schedule.component.html',
  styleUrls: ['./flight-schedule.component.scss'],
})
export class FlightScheduleComponent implements OnInit {
  flightData: any;
  filteredFlights: any = [];
  flightNumber: any = null;

  constructor(
    private flightService: FlightService,
    private datePipe: DatePipe,
    private router: Router,
    private seatingService: SeatingService
  ) {}

  //this.filterDate=this.datePipe.transform(new Date(),'yyyy-MM-ddTHH:mm') ??'';
  ngOnInit(): void {
    this.flightService.getFlightData().subscribe(
      (data) => {
        const currentDate = new Date();
        this.flightData = data.filter(
          (x: any) => new Date(x.departure_date) > currentDate
        );
        //console.log('flight data:',this.flightData);
      },
      (err) => {
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
    this.router.navigate(['/seating']);
    this.seatingService.setFlightNumber(flightCode);
    this.flightNumber = flightCode;
    console.log('flightnumber:', this.flightNumber);
  }
}
