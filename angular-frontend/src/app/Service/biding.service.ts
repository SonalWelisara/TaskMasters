import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from 'express';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8086/labor/"

@Injectable({
  providedIn: 'root'
})
export class BidingService {

  constructor(private http : HttpClient){}

  // Create Bid
  postBid(bidding: any): Observable<any> {
    return this.http.post(BASIC_URL + "bid", bidding);
  }

  // Delete bid
  deleteBid(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + "bid/" + id);
  }

  // Get All bid
  getAllBid(): Observable<any> {
    return this.http.get(BASIC_URL + "bid");
  }

  // Get bid by id 
  getBidById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + "bid/" + id);
  }

  // Update bid
  updateBid(id: number, bidding: any): Observable<any> {
    return this.http.put(BASIC_URL + "bid/" + id, bidding);
  }
}