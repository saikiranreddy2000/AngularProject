import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AncillaryService {
  private apiUrl = ' http://localhost:3000/ancillary_services';

  constructor(private http: HttpClient) {}
  getancillaryData(): Observable<any> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(map((e: any[]) => e.sort((a, b) => b.id - a.id)));
  }

  deleteData(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError((error) => {
        console.error('Error in deleteData:', error);
        return throwError(error);
      })
    );
  }
}
