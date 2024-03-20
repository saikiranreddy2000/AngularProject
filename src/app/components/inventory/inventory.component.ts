import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services/flight.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { SeatingService } from 'src/app/services/seating.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  flightData: any = [];
  flightDetails: any = [];
  passengerData: any = [];
  passengersDetails: any = [];
  bookedPassenegers: any;
  seatsNotBooked: any;
  onBoardedDetails: any = [];
  onBoardedPassengers: any = [];
  constructor(
    private flightService: FlightService,
    private seatingService: SeatingService,
    private passengerService: PassengerService
  ) {}

  ngOnInit(): void {
    this.flightService.getFlightData().subscribe((data) => {
      const currentDate = new Date();
      this.flightData = data
        .filter((x: any) => new Date(x.departure_date) > currentDate)
        .sort((a: any, b: any) => {
          if (a.departure_date < b.departure_date) {
            return 1;
          }
          if (a.departure_date > b.departure_date) {
            return -1;
          }
          return 0;
        });
    });
    this.seatingService.passengerData().subscribe((data) => {
      this.passengerData = data;
    });
    this.passengerService.getOnboardedPassengerslist().subscribe((data) => {
      this.onBoardedDetails = data;
    });
  }
  Details(flightCode: any) {
    this.passengersDetails.length = 0;
    this.flightDetails.length = 0;
    let flight = this.flightData.find(
      (flight: { flight_number: any }) => flight.flight_number === flightCode
    );

    if (flight) {
      this.flightDetails.push(flight);
    }
    let passenger = this.passengerData.filter(
      (passenger: { flight_number: any }) =>
        passenger.flight_number === flightCode
    );
    this.passengersDetails.push(...passenger);

    this.passengerBookedForThisFlight();
    this.onboardedPassengersForThisFlight(flightCode);
  }
  passengerBookedForThisFlight() {
    this.bookedPassenegers = this.passengersDetails.length;
    return this.bookedPassenegers;
  }
  onboardedPassengersForThisFlight(flightCode: any) {
    let passenger = this.onBoardedDetails.filter(
      (passenger: { flight_number: any }) =>
        passenger.flight_number === flightCode
    );
    this.onBoardedPassengers.length = 0;
    if (passenger) {
      this.onBoardedPassengers.push(...passenger);
    }
    return this.onBoardedPassengers.length;
  }
}
