import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL_STORECART = "http://localhost:8086/api/"
@Injectable({
  providedIn: 'root'
})
export class StoreAddCartService {

  constructor(private http : HttpClient) { }

  postStoreAddCart(storeCart:any):Observable<any>{
    return this.http.post(BASIC_URL_STORECART + "store/storeCart",storeCart);
  }

  deleteAddCart(id:number):Observable<any>{
    return this.http.delete(BASIC_URL_STORECART +"store/storeCart/"+ id)
  }

  //get Product By id 
  getAddCartById(id:number):Observable<any>{
    return this.http.delete(BASIC_URL_STORECART + "store/storeCart/"+ id)
  }

 

  //get all add to cart 
  getAllStoreCart(user : number):Observable<any>{
    return this.http.get(BASIC_URL_STORECART + "store/addcart/" + user)
  }

  //update Product
  updateStoreCart(id:number , storeCart:any): Observable<any>{
    return this.http.put(BASIC_URL_STORECART + "store/storeCart/" + id , storeCart);
  }

  
}
