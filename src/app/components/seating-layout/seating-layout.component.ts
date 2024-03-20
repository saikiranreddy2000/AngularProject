import { getLocaleDateTimeFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FlightService } from 'src/app/services/flight.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { SeatingService } from 'src/app/services/seating.service';

@Component({
  selector: 'app-seating-layout',
  templateUrl: './seating-layout.component.html',
  styleUrls: ['./seating-layout.component.scss'],
})
export class SeatingLayoutComponent implements OnInit {
  flightData!: any[];
  seats: string[] = [];
  passengerData: any = [];
  public PassengerDetailsEntryForm: FormGroup | any;
  totalOnboardedpassengerData: any = [];
  onboardedBasedOnFlight: any = [];

  constructor(
    private http: HttpClient,
    private flightService: FlightService,
    private seatingService: SeatingService,
    private router: Router,
    private formBuilder: FormBuilder,
    private passengerService: PassengerService
  ) {}

  ngOnInit(): void {
    this.PassengerDetailsEntryForm = this.formBuilder.group({
      flight_number: [''],
      passenger_name: [''],
      seat_number: [''],
      booking_date: [''],
      ticket_price: [''],
      ancillary_services: [''],
      requires_wheelchair: [''],
      traveling_with_infant: [''],
    });
    this.flightService.getFlightData().subscribe((data) => {
      this.flightData = data;
      // console.log('flight data:', this.flightData);
    });
    this.seatingService.passengerData().subscribe(
      (data) => {
        this.passengerData = data.sort((a: any, b: any) => {
          if (a.seat_number < b.seat_number) {
            return -1;
          }
          if (a.seat_number > b.seat_number) {
            return 1;
          }
          return 0;
        });
      },
      (err) => {
        alert('something went wrong!');
      }
    );
    this.passengerService
      .getOnboardedPassengerslist()
      .subscribe((data: any) => {
        this.totalOnboardedpassengerData = data;
      });
    this.SeatsFunction();
  }

  SeatsFunction() {
    let availableSeats = 200;
    for (let i = 65; i <= 75; i++) {
      let alpha = String.fromCharCode(i);
      for (let j = 1; j <= 10; j++) {
        this.seats.push(alpha + j);
        // console.log(this.seats)
      }
    }
  }
  getVariable(): string {
    return this.seatingService.getFlightNumber();
  }
  navigateToSchedule() {
    this.router.navigate(['/flightschedule']);
  }
  PassengerDetailsEntry() {
    this.http
      .post<any>(
        'http://localhost:3000/passengersData',
        this.PassengerDetailsEntryForm.value
      )
      .subscribe(
        (res) => {
          this.PassengerDetailsEntryForm.reset();
          alert('passenger added');
        },
        (err) => {
          alert('Something went wrong');
        }
      );
  }

  onboarded(Passengerid: any) {
    let passenger = this.passengerData.find(
      (passenger: { id: any }) => passenger.id === Passengerid
    );
    if (passenger) {
      this.passengerService.addPassengerDetails(passenger).subscribe(
        (res) => {
          this.totalOnboardedpassengerData.push(res);
        },
        (error) => {
          console.log('Error while adding passenger:', error);
        }
      );
    } else {
      console.log('Passenger not found with Id');
    }
  }
  filterOnboardedPassengers(id: any): any {
    let passenger = this.passengerData.find(
      (passenger: { flight_number: any; id: any }) =>
        passenger.flight_number == this.getVariable() && passenger.id == id
    );
    console.log(passenger);
    if (passenger) {
      this.onboardedBasedOnFlight.push(passenger);
    }
    // this.onboardedBasedOnFlight;
  }
  notOnbordered(id: any) {
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

  onCheckboxChange(event: any, id: any) {
    if (event.target.checked) {
      // console.log('Checkbox is Checked');
      this.onboarded(id);
      this.filterOnboardedPassengers(id);
    } else {
      this.notOnbordered(id);
      // console.log('Checkbox is unchecked');
    }
  }
}
