import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  env = environment;
  taskManagersURL = environment.hostURL;

  constructor(private http: HttpClient) { }

  login(loginInfo: any): Observable<any> {
    let url = `${this.taskManagersURL}/api/users/authenticate`;
    return this.http.post(url, loginInfo) as Observable<any>;
  }

  //user context API

  forgotPassDetails(email: string): Observable<any> {
    let url = `${this.taskManagersURL}/api/users/forgot-password`;
    let formData: FormData = new FormData();
    formData.append('email', email);
    
    // Set headers for form data
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    return this.http.post(url, formData, { headers: headers }) as Observable<any>;
  }

  resetPassword(token:string, newPassword: string): Observable<any> {
    let url = `${this.taskManagersURL}/api/users/reset-password?token=${token}&newPassword=${newPassword}`;
    return this.http.post(url, '') as Observable<any>;
  }
}
