import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {
  env = environment;
  taskManagersURL = environment.hostURL;
  constructor(private http: HttpClient) { }

  jobPost(post: any): Observable<any> {
    let url = `${this.taskManagersURL}/api/job-posts/`;
    return this.http.post(url, post) as Observable<any>;
  }


}
