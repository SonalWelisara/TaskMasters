import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

    env = environment;
    taskManagersURL = environment.hostURL;
    constructor(private http: HttpClient) { }

    getDriversList(): Observable<any> {
      let url = `${this.taskManagersURL}/api/drivers/all`;
        return this.http.get(url) as Observable<any>;
    }
    SaveDriver(payload:any): Observable<any> {
      let url = `${this.taskManagersURL}/api/drivers/save`;
      return this.http.post(url,payload) as Observable<any>;
    }
    deleteDriver(id:string): Observable<any> {
      let url = `${this.taskManagersURL}/api/drivers/${id}`;
      return this.http.delete(url,) as Observable<any>;
    }
    updateDriver(id:string,payload:any): Observable<any> {
      let url = `${this.taskManagersURL}/api/drivers/${id}`;
      return this.http.put(url,payload) as Observable<any>;
    }
    getReportData():Observable<any>{
      let url = `${this.taskManagersURL}/api/drivers/report`;
      return this.http.get(url,{}) as Observable<any>;
   
    }
}
