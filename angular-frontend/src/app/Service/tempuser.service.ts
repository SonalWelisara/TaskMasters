import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL_UserStore = "http://localhost:8086/"
@Injectable({
  providedIn: 'root'
})
export class TempuserService {

  constructor( private http:HttpClient) { }

  //get User by id
  getUserById(id:number):Observable<any>{
    return this.http.get(BASIC_URL_UserStore +"userStore/"+id)
  }
}
