import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SeatingService {
  private apiUrl = 'http://localhost:3000/passengersData';
  flightnumber!: string;
  passengerCountMap: any;
  private fcode!: string;

  constructor(private http: HttpClient) {}
  setFlightNumber(code: string) {
    this.flightnumber = code;
  }
  getFlightNumber() {
    return this.flightnumber;
  }

  passengerData(): Observable<any> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(map((e: any[]) => e.sort((a, b) => b.id - a.id)));
  }
}
