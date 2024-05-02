import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseURL = "http://localhost:8086"
  constructor(private httpClient : HttpClient) { }

  getPaymentByMonth(year: number) {
    return this.httpClient.get<any[]>(`${this.baseURL}/adminPayment?year=${year}`);
  }

}
