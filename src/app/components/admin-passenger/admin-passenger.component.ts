import { getLocaleDateFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AncillaryService } from 'src/app/services/ancillary.service';
import { FlightService } from 'src/app/services/flight.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { SeatingService } from 'src/app/services/seating.service';

@Component({
  selector: 'app-admin-passenger',
  templateUrl: './admin-passenger.component.html',
  styleUrls: ['./admin-passenger.component.scss'],
})
export class AdminPassengerComponent implements OnInit {
  countOfSeats!: number;
  seats: any[] = [];
  ancillary: any = [];
  passengerData: any = [];
  flightData: any = [];
  passengerdetails: any = [];
  getonboarded: any = [];
  totalOnboardedpassengerData: any;
  onboardedBasedOnFlight: any;
  flightNumber!: string;
  public PassengerDetailsEntryForm: FormGroup | any;
  constructor(
    private formBuilder: FormBuilder,
    private seatingService: SeatingService,
    private flightService: FlightService,
    private modelServices: NgbModal,
    private passengerService: PassengerService,
    private ancillaryservice: AncillaryService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.PassengerDetailsEntryForm = this.formBuilder.group({
      flight_number: [''],
      passenger_name: ['', Validators.required],
      seat_number: ['', Validators.required],
      booking_date: ['', Validators.required],
      passport: ['', Validators.required],
      ticket_price: [''],
      services: [['']],
    });
    this.flightNumber = this.seatingService.getFlightNumber();
    this.flightService.getFlightData().subscribe((data: any) => {
      this.flightData = data.filter((x: any) => {
        if (x.flight_number == this.flightNumber) {
          return x;
        }
        console.log(this.flightData);
      });
      this.countOfSeats = this.flightData[0]?.available_seats;
    });
    this.seatingService.passengerData().subscribe((data) => {
      this.passengerData = data.filter(
        (x: any) => x.flight_number == this.flightNumber
      );
      //console.log('this.passengerData', this.passengerData);
      this.seatsFunction(this.passengerData, this.countOfSeats);
    });
    this.ancillaryservice.getancillaryData().subscribe((data) => {
      this.ancillary = data.map((service: any) => service.service_name);
      // console.log(this.ancillary);
    });
  }
  seatsFunction(passengerdata: any, countofseats: any) {
    let limit = countofseats / 10;
    console.log(limit);
    for (let i = 65; i <= 64 + limit; i++) {
      let alpha = String.fromCharCode(i);
      for (let j = 1; j <= 10; j++) {
        let comb = alpha + j;
        const found = passengerdata.some(
          (element: any) => comb == element.seat_number
        );
        if (found) {
          this.seats.push({ seat: alpha + j, value: true });
          //console.log(this.seats);
        } else {
          this.seats.push({ seat: alpha + j, value: false });
        }
      }
    }
  }
  rest() {
    this.PassengerDetailsEntryForm.reset();
  }
  seatlayout(para: any) {
    const passenger = this.passengerData.find(
      (x: any) => x.seat_number === para
    );
    if (passenger) {
      this.PassengerDetailsEntryForm.patchValue(passenger);
    } else {
      const seat = {
        seat_number: para,
      };
      this.PassengerDetailsEntryForm.patchValue(seat);
    }
  }
  openVerticallyCentered(content: any) {
    this.modelServices.open(content, { centered: true });
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
  deleteData(passenger: any, i: number): void {
    this.passengerService.deleteData(passenger?.id).subscribe(
      (res) => {
        this.passengerData.splice(i, 1);
        console.log('Data deleted Successfully');
      },
      (err) => {
        console.log('error in deleting the data');
      }
    );
  }
}
