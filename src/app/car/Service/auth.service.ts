import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  [x: string]: any;

  private Login = 'http://192.168.20.78:3000/api/v1/login';
  private Signup = 'http://192.168.20.78:3000/api/v1/createEmployee';

  constructor(private http: HttpClient) {}

  login(data:any): Observable<any> {
    return this.http.post(this.Login, data);
  }

  signup(data:any): Observable<any> {
    return this.http.post(this.Signup, data);
  }
}
