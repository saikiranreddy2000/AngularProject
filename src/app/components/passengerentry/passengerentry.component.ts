import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AncillaryService } from 'src/app/services/ancillary.service';
import { FlightService } from 'src/app/services/flight.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { SeatingService } from 'src/app/services/seating.service';

@Component({
  selector: 'app-passengerentry',
  templateUrl: './passengerentry.component.html',
  styleUrls: ['./passengerentry.component.scss'],
})
export class PassengerentryComponent implements OnInit {
  passengerData: any[] = [];
  passengerId: any | undefined;
  flightData: any[] = [];
  filterdpassengerData: any[] = [];
  ancillary: any = [];

  public PassengerDetailsEntryForm: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private passengerService: PassengerService,
    private http: HttpClient,
    private seatingService: SeatingService,
    private flightService: FlightService,
    private ancillaryservice: AncillaryService
  ) {}
  ngOnInit(): void {
    this.PassengerDetailsEntryForm = this.formBuilder.group({
      flight_number: [''],
      passenger_name: ['', Validators.required],
      seat_number: ['', Validators.required],
      booking_date: ['', Validators.required],
      ticket_price: [''],
      ancillary_services: [''],
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

        console.log('passenger:', this.passengerData);
      },
      (err) => {
        alert('something went wrong!');
      }
    );
    this.flightService.getFlightData().subscribe((data) => {
      const currentDate = new Date();
      this.flightData = data
        .filter((x: any) => new Date(x.departure_date) > currentDate)
        .map((y: any) => {
          return y.flight_number;
        });
      console.log('flight data:', this.flightData);
    });
    this.ancillaryservice.getancillaryData().subscribe((data) => {
      this.ancillary = data.map((service: any) => service.service_name);
      console.log(this.ancillary);
    });
  }

  deleteData(passenger: any, i: number): void {
    this.passengerService.deleteData(passenger?.id).subscribe(
      () => {
        this.passengerData.splice(i, 1);
        console.log('Data deleted Successfully');
      },
      (err) => {
        console.log('error in deleting the data');
      }
    );
  }

  PassengerDetailsEntry() {
    const params = this.PassengerDetailsEntryForm.value;
    this.http
      .post<any>('http://localhost:3000/passengersData', params)
      .subscribe(
        (res) => {
          this.PassengerDetailsEntryForm.reset();
          this.passengerData.push(res);
        },
        (err) => {
          alert('Something went wrong');
        }
      );
  }
}
