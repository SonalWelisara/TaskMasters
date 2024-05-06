import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Developers } from '../Dto/developers';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  private baseURL = "http://localhost:8086/api"
  constructor(private httpClient : HttpClient) { }
  
  // getDevList(): Observable<any>{
  //   return this.httpClient.get(this.baseURL+"devs")
  // }
  getAllDevs():Observable<any>{
    return this.httpClient.get(this.baseURL + "/admin/devs")
  }

  getDevById(id:number):Observable<any>{
    return this.httpClient.get(this.baseURL + "/admin/devs/" + id)
  }

  updateDev(id:number, dev:any):Observable<any>{
    return this.httpClient.put(this.baseURL + "/admin/updateDev/" + id , dev);
  }

  deleteDev(id:number):Observable<any>{
    return this.httpClient.delete(this.baseURL + "/admin/devs/" + id)
  }

  addDev(dev:any):Observable<any>{
    return this.httpClient.post(this.baseURL +"/admin/addDev",dev);
  }
}
