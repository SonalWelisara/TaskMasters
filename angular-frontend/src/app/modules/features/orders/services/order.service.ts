import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    env = environment;
    taskManagersURL = environment.hostURL;
    constructor(private http: HttpClient) { }

    getOrders(): Observable<any> {
      let url = `${this.taskManagersURL}/api/orders/pending`;
        return this.http.get(url) as Observable<any>;
      }
    assignOrder(id:string,status:string,driverId:string): Observable<any> {
        let url = `${this.taskManagersURL}/api/orders/update/${id}?status=${status}&driverId=${driverId}`;
          return this.http.put(url,{}) as Observable<any>;
        }
}
