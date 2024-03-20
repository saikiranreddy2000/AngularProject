import { Component, OnInit, TemplateRef } from '@angular/core';
import { SeatingService } from '../services/seating.service';
import { FlightService } from '../services/flight.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PassengerService } from '../services/passenger.service';

@Component({
  selector: 'app-inflight',
  templateUrl: './inflight.component.html',
  styleUrls: ['./inflight.component.scss'],
})
export class InflightComponent implements OnInit {
  seats: any[] = [];
  passengerData: any = [];
  flightData: any = [];
  countOfSeats!: number;
  passengerdetails: any = [];
  checkedOutpassengerData: any = [];
  onboardedBasedOnFlight: any = [];
  constructor(
    private seatingService: SeatingService,
    private flightService: FlightService,
    private modelServices: NgbModal,
    private passengerService: PassengerService
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
    this.passengerService.getOnboardedPassengerslist().subscribe((data) => {
      this.passengerData = data.filter(
        (x: any) => x.flight_number == this.seatingService.getFlightNumber()
      );
      //console.log('this.passengerData', this.passengerData);
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
          // console.log(this.seats);
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

    console.log('this.passengerdetails', this.passengerdetails);
  }

  openVerticallyCentered(content: any) {
    this.modelServices.open(content, { centered: true });
  }
  checkedOut(Passengerid: any) {
    let passenger = this.passengerData.find(
      (passenger: { id: any }) => passenger.id === Passengerid
    );

    if (passenger) {
      this.passengerService.checkOutPassengers(passenger).subscribe(
        (res) => {
          this.checkedOutpassengerData.push(res);
          alert('passenger checkout');
          this.passengerService.deleteonboardedData(Passengerid).subscribe(
            (res) => {
              console.log('Passenger is Deleted');
              this.onboardedBasedOnFlight = this.onboardedBasedOnFlight.filter(
                (passenger: { id: any }) => passenger.id !== Passengerid
              );
            },
            (err: any) => {
              console.log('Error');
            }
          );
        },

        (error) => {
          console.log('Error while adding passenger:', error);
          alert('Passenger already checkout');
        }
      );
    } else {
      console.log('Passenger not found with Id');
    }
  }
}
