import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlightService } from 'src/app/services/flight.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { SeatingService } from 'src/app/services/seating.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss'],
})
export class CheckinComponent implements OnInit {
  seats: any[] = [];
  passengerData: any = [];
  flightData: any = [];
  countOfSeats!: number;
  passengerdetails: any = [];
  getonboarded: any = [];
  totalOnboardedpassengerData: any;
  onboardedBasedOnFlight: any;

  constructor(
    private seatingService: SeatingService,
    private flightService: FlightService,
    private modelServices: NgbModal,
    private passengerService: PassengerService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.flightService.getFlightData().subscribe((data: any) => {
      this.flightData = data.filter((x: any) => {
        if (x.flight_number == this.seatingService.getFlightNumber()) {
          return x;
        }
      });

      // console.log('flight data:', this.flightData);
      this.countOfSeats = this.flightData[0].available_seats;

      // console.log('this.countOfSeats', this.countOfSeats);
    });
    this.seatingService.passengerData().subscribe((data) => {
      this.passengerData = data.filter(
        (x: any) => x.flight_number == this.seatingService.getFlightNumber()
      );
      console.log('this.passengerData', this.passengerData);
      this.seatsFunction(this.passengerData, this.countOfSeats);
    });
  }

  seatsFunction(passengerdata: any, countofseats: any) {
    let limit = this.countOfSeats / 10;
    console.log(limit);
    for (let i = 65; i <= 64 + limit; i++) {
      let alpha = String.fromCharCode(i);
      for (let j = 1; j <= 10; j++) {
        let comb = alpha + j;
        const found = passengerdata.some(
          (element: any) => comb === element.seat_number
        );
        if (found) {
          this.seats.push({ seat: alpha + j, value: true });
        } else {
          this.seats.push({ seat: alpha + j, value: false });
        }
      }
    }
  }
  getpassengerdetails(seat: any) {
    this.passengerdetails = this.passengerData.filter(
      (x: any) => x.seat_number == seat
    );
  }

  openVerticallyCentered(content: any) {
    this.modelServices.open(content, { centered: true });
  }

  onboarded(Passengerid: any) {
    let passenger = this.passengerData.find(
      (passenger: { id: any }) => passenger.id === Passengerid
    );

    if (passenger) {
      this.passengerService.addPassengerDetails(passenger).subscribe(
        (res) => {
          this.totalOnboardedpassengerData.push(res);
          alert('passenger onboarded');
        },
        (error) => {
          console.log('Error while adding passenger:', error);
        }
      );
    } else {
      console.log('Passenger not found with Id');
    }
  }
  remove(id: any) {
    this.passengerService.deleteonboardedData(id).subscribe(
      (res) => {
        console.log('Passenger is Deleted');
        this.onboardedBasedOnFlight = this.onboardedBasedOnFlight.filter(
          (passenger: { id: any }) => passenger.id !== id
        );
      },
      (err: any) => {
        console.log('Error');
      }
    );
  }
}
