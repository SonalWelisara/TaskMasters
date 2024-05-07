import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8086/api/";
@Injectable({
  providedIn: 'root'
})
export class StoreItemService {

  constructor(private http : HttpClient) { }

  //create Product
  postStoreItem(storeItem:any):Observable<any>{
    return this.http.post(BASIC_URL +"store/storeItem",storeItem);
  }

  //get ALl product
  getAllStoreItem():Observable<any>{
    return this.http.get(BASIC_URL + "store/storeItem")
  }

  //Delete Product
  deleteStoreItem(id:number):Observable<any>{
    return this.http.delete(BASIC_URL + "store/storeItem/" + id)
  }

  //get Product By id 
  getStoreItemById(id:number):Observable<any>{
    return this.http.get(BASIC_URL + "store/storeItem/" + id)
  }

  //Update Product
  updateStoreItem(id:number, storeItem:any):Observable<any>{
    return this.http.put(BASIC_URL + "store/storeItem/" + id , storeItem);
  }
}
