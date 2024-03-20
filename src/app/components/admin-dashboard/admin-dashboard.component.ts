import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeatingService } from 'src/app/services/seating.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  flightNumber: any;
  constructor(private seatingService: SeatingService, private router: Router) {}

  ngOnInit(): void {
    const flightCode = this.seatingService.getFlightNumber();
  }
}
