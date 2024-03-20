import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AncillaryService } from 'src/app/services/ancillary.service';
import { FlightService } from 'src/app/services/flight.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { SeatingService } from 'src/app/services/seating.service';

@Component({
  selector: 'app-ancillary-services',
  templateUrl: './ancillary-services.component.html',
  styleUrls: ['./ancillary-services.component.scss'],
})
export class AncillaryServicesComponent implements OnInit {
  onButtonClick() {
    console.log(this.selectedOption);
  }
  public serviceEntryForm: FormGroup | any;
  passengerInfo: any = [];
  passenger: any = [];
  ancillary: any = [];
  flightData: any = [];
  selectedOption!: string;

  constructor(
    private seatingService: SeatingService,
    private modalService: NgbModal,
    private ancillaryservice: AncillaryService,
    private flightService: FlightService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.serviceEntryForm = this.formBuilder.group({
      service_name: ['', Validators.required],
    });

    this.ancillaryservice.getancillaryData().subscribe((data: any) => {
      this.ancillary = data;
      //.map((service: any) => service.service_name);
      console.log('ancillary', this.ancillary);
    });
    this.seatingService.passengerData().subscribe((data) => {
      this.passengerInfo = data;
      //console.log(this.passengerInfo);
    });
    this.flightService.getFlightData().subscribe((data) => {
      const currentDate = new Date();
      this.flightData = data
        //.filter((x: any) => new Date(x.departure_date) > currentDate)
        .map((y: any) => {
          return y.flight_number;
        });
      console.log('flight data:', this.flightData);
    });
  }
  getservice(service: any) {
    console.log(service);
    console.log('this.passengerInfo', this.passengerInfo);
    this.passenger = this.passengerInfo.filter((pass: any) => {
      return (
        pass.ancillary_services.includes(service) &&
        pass.flight_number == this.selectedOption
      );
    });
    console.log('passenger', this.passenger);
  }
  removeService(service: any, i: any) {
    console.log(service?.i);
    this.ancillaryservice.deleteData(service?.id).subscribe(
      () => {
        this.ancillary.splice(i, 1);
        alert('access given');
      },
      (err) => {
        console.log('error in deleting the data', err);
      }
    );
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  serviceDetailsEntry() {
    const params = this.serviceEntryForm.value;
    this.http
      .post<any>('http://localhost:3000/ancillary_services', params)
      .subscribe(
        (res) => {
          this.serviceEntryForm.reset();
          this.ancillary.push(res);
          //alert("service added");
        },
        (err) => {
          alert('Something went wrong');
        }
      );
  }
}
