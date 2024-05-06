import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from 'express';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8086/api/"

@Injectable({
  providedIn: 'root'
})
export class BidingService {

  constructor(private http : HttpClient){}

  // Create Bid
  postBid(bidding: any): Observable<any> {
    return this.http.post(BASIC_URL + "labor/bid", bidding);
  }

  // Delete bid
  deleteBid(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + "labor/bid/" + id);
  }

  // Get All bid
  getAllBid(): Observable<any> {
    return this.http.get(BASIC_URL + "labor/bid");
  }

  // Get bid by id 
  getBidById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + "labor/bid/" + id);
  }

  // Update bid
  updateBid(id: number, bidding: any): Observable<any> {
    return this.http.put(BASIC_URL + "labor/bid/" + id, bidding);
  }
}