import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  env = environment;
  taskManagersURL = environment.hostURL;

  constructor(private http: HttpClient) { }

  updateProfile(userEmail:any, updatedUser: any, ): Observable<any> {
    let url = `${this.taskManagersURL}/api/users/update?email=${userEmail}`;
    return this.http.put(url, updatedUser) as Observable<any>;
  }

  deleteProfile(userEmail:any): Observable<any> {
    let url = `${this.taskManagersURL}/api/users/delete?email=${userEmail}`;
    return this.http.delete(url) as Observable<any>;
  } 

  getReportDetails(id:any): Observable<any> {
    let url = `${this.taskManagersURL}/api/users/User-report`;
    const params = { id: id.toString() };
    return this.http.get(url,{params}) as Observable<any>;
  }
}
