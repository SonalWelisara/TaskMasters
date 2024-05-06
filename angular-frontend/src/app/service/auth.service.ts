import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.post<boolean>('/dev/check-email', { email });
  }
}
