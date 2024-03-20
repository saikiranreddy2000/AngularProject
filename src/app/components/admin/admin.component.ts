import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlightService } from 'src/app/services/flight.service';
import { SeatingService } from 'src/app/services/seating.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  flightData: any;
  filteredFlights: any = [];
  flightNumber: any = null;
  public FlightDetailsEntryForm: FormGroup | any;
  filterDate: any;

  constructor(
    private flightService: FlightService,
    private datePipe: DatePipe,
    private router: Router,
    private seatingService: SeatingService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private http: HttpClient,
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
      pilot: ['', Validators.required],
      co_pilot: ['', Validators.required],
      cabin_crew: ['', Validators.required],
      plane_type: ['', Validators.required],
    });
    this.filterDate =
      this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm') ?? '';
    this.flightService.getFlightData().subscribe(
      (data: any) => {
        this.flightData = data.filter(
          (x: any) => x.departure_date >= this.filterDate
        );
        console.log('flight data:', this.flightData);
      },
      (err: any) => {
        alert('something went wrong!');
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
  getCurrentDate() {
    return new Date();
  }
  formateDate(date: Date) {
    return this.datePipe.transform(date, 'EE,d MMM yy');
  }
  formateTime(date: Date) {
    return this.datePipe.transform(date, 'hh:mm a');
  }
  flightcode(flightCode: string) {
    this.seatingService.setFlightNumber(flightCode);
        this.router.navigate(['/home/admindashboard']);
   
    // this.flightNumber = flightCode;
    // console.log('flightnumber:', this.flightNumber);
  }

  openXl(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'xl' });
  }
}
