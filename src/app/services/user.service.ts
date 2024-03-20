import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: any;
  private apiUrl1 = 'http://localhost:3000/user';
  private apiUrl2 = 'http://localhost:3000/Notapprovedusers';
  constructor(private http: HttpClient) {}
  setUser(user: any) {
    this.user = user;
  }
  getUser() {
    return this.user;
  }
  getUserRole(): string {
    return this.user.role;
  }
  userData(): Observable<any> {
    return this.http
      .get<any[]>(this.apiUrl1)
      .pipe(map((e: any[]) => e.sort((a, b) => b.id - a.id)));
  }
  deletefromnotApproverlist(id: string): Observable<any> {
    const url = `${this.apiUrl2}/${id}`;
    return this.http.delete(url);
  }
  deletefromApproverlist(id: string): Observable<any> {
    const url = `${this.apiUrl1}/${id}`;
    return this.http.delete(url);
  }

  notapproveduser(): Observable<any> {
    return this.http
      .get<any[]>(this.apiUrl2)
      .pipe(map((e: any[]) => e.sort((a, b) => b.id - a.id)));
  }
}
