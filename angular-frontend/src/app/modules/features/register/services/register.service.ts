import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  env = environment;
  taskManagersURL = environment.hostURL;

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let url = `${this.taskManagersURL}/api/users/register`;
    return this.http.post(url, user, {headers: headers}) as Observable<any>;
  }
}
