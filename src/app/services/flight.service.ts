import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private apiUrl = 'http://localhost:3000/flightDetails';

  constructor(private http: HttpClient) {}
  getFlightData(): Observable<any> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(
        map((e: any[]) => e.sort((a, b) => b.departure_date - a.departure_date))
      );
  }
  getFlightId(): Observable<any> {
    return this.http.get(`${this.apiUrl}/flight_number`);
  }
  getSeatcount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/available_seats`);
  }
  update(Id: any, newData: any): Observable<any> {
    const url = `${this.apiUrl}/${Id}`;
    return this.http.put(url, newData);
  }
  deleteData(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
