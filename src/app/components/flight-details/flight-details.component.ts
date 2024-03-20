import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
})
export class FlightDetailsComponent implements OnInit {
  flightData: any = [];
  public FlightDetailsEntryForm: FormGroup | any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private flightservice: FlightService
  ) {}

  ngOnInit(): void {
    this.FlightDetailsEntryForm = this.formBuilder.group({
      flight_number: ['', Validators.required],
      airline: ['', Validators.required],
      departure_airport: ['', Validators.required],
      departure_date: ['', Validators.required],
      arrival_airport: ['', Validators.required],
      arrival_date: ['', Validators.required],
      passenger_capacity: ['', Validators.required],
      available_seats: ['', Validators.required],
      ticket_price: ['', Validators.required],
      pilot: ['', Validators.required],
      co_pilot: ['', Validators.required],
      cabin_crew: ['', Validators.required],
      plane_type: ['', Validators.required],
    });
    this.flightservice.getFlightData().subscribe(
      (data) => {
        this.flightData = data.sort((a: any, b: any) => {
          if (a.departure_date < b.departure_date) {
            return 1;
          }
          if (a.departure_date > b.departure_date) {
            return -1;
          }
          return 0;
        });
      },
      (err) => {
        alert('something went wrong!');
      }
    );
  }

  deleteData(passenger: any, i: number): void {
    this.flightservice.deleteData(passenger?.id).subscribe(
      () => {
        this.flightData.splice(i, 1);
        alert('Successfully Deleted');
        console.log('Data deleted Successfully');
      },
      (err) => {
        console.log('error in deleting the data');
      }
    );
  }
  FlightDetailsEntry() {
    this.http
      .post<any>(
        'http://localhost:3000/flightDetails',
        this.FlightDetailsEntryForm.value
      )
      .subscribe(
        (res) => {
          this.FlightDetailsEntryForm.reset();
          this.flightData.push(res);
        },
        (err) => {
          alert('Something went wrong');
        }
      );
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
