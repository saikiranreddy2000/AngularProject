import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  private apiUrl = 'http://localhost:3000/passengersData';
  private apiUrl2 = 'http://localhost:3000/checkIn';
  private apiUrl3 = 'http://localhost:3000/checkOut';
  constructor(private http: HttpClient) {}

  addPassengerDetails(passenger: object): Observable<object> {
    return this.http.post<any>(this.apiUrl2, passenger);
  }
  checkOutPassengers(passenger: object): Observable<Object> {
    return this.http.post<any>(this.apiUrl3, passenger);
  }
  deleteData(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
  deleteonboardedData(seat: string): Observable<any> {
    const url = `${this.apiUrl2}/${seat}`;
    return this.http.delete(url);
  }
  updatePassenger(passengerId: number, updatePassenger: any): Observable<any> {
    const url = `${this.apiUrl}/${passengerId}`;
    return this.http.put(url, updatePassenger);
  }
  getPassengerDetails(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  getOnboardedPassengerslist(): Observable<any> {
    return this.http
      .get<any[]>(this.apiUrl2)
      .pipe(map((e: any[]) => e.sort((a, b) => b.id - a.id)));
  }
  // getOnboardedlist(){
  //   return fetch(this.apiUrl2);
  // }
}
