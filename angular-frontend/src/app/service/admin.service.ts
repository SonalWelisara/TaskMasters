import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseURL = "http://localhost:8086"
  constructor(private httpClient : HttpClient) { }

  getPaymentByMonth(year: number) {
    return this.httpClient.get<any[]>(`${this.baseURL}/api/admin/adminPayment?year=${year}`);
  }

  getEmpRating(){
    return this.httpClient.get<any>(`${this.baseURL}/api/admin/mostRatedEmp`)
  }

  getItemRating(){
    return this.httpClient.get<any>(`${this.baseURL}/api/admin/mostRatedItem`)
  }
  getReportData():Observable<any>{
    let url = `${this.baseURL}/api/admin/report`;
    return this.httpClient.get(url,{}) as Observable<any>;
  }

}
