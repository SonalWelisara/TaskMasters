import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Developers } from '../Dto/developers';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  private baseURL = "http://localhost:8086"
  constructor(private httpClient : HttpClient) { }
  
  // getDevList(): Observable<any>{
  //   return this.httpClient.get(this.baseURL+"devs")
  // }
  getAllDevs():Observable<any>{
    return this.httpClient.get(this.baseURL + "/devs")
  }

  getDevById(id:number):Observable<any>{
    return this.httpClient.get(this.baseURL + "/devs/" + id)
  }

  updateDev(id:number, dev:any):Observable<any>{
    return this.httpClient.put(this.baseURL + "/updateDev/" + id , dev);
  }

  deleteDev(id:number):Observable<any>{
    return this.httpClient.delete(this.baseURL + "/devs/" + id)
  }

  addDev(dev:any):Observable<any>{
    return this.httpClient.post(this.baseURL +"/addDev",dev);
  }
}
