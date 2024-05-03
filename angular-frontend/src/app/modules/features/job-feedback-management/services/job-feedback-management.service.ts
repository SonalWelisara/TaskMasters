import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobFeedbackManagementService {
  env = environment;
  taskManagersURL = environment.hostURL;
  constructor(private http: HttpClient) { }

  getJobPostsByUserId(userId: number): Observable<any> {
    const url = `${this.taskManagersURL}/api/job-posts/get-all-job-post-by-user`;
    const params = { userId: userId.toString() };
    return this.http.get(url, { params }) as Observable<any>;
  }

  UpdateJobPost(id: number,data:any): Observable<any> {
    const url = `${this.taskManagersURL}/api/job-posts/update`;
    const params = { id: id.toString() };
    return this.http.put(url, data, { params }) as Observable<any>;
  }

  DeleteJobPost(id: number): Observable<any> {
    const url = `${this.taskManagersURL}/api/job-posts/delete`;
    const params = { id: id.toString() };
    return this.http.delete (url,{ params }) as Observable<any>;
  }

  
  PostFeedback(data:any): Observable<any> {
    const url = `${this.taskManagersURL}/api/feedback`;
    return this.http.post(url, data) as Observable<any>;
  }
  GetPostFeedbackByID(id:number): Observable<any> {
    const url = `${this.taskManagersURL}/api/feedback`;
    const params = { id: id.toString() };
    return this.http.get(url, {params}) as Observable<any>;
  }
  GetPostFeedbackByUserID(userId:number): Observable<any> {
    const url = `${this.taskManagersURL}/api/feedback/user`;
    const params = { userId: userId.toString() };
    return this.http.get(url, {params}) as Observable<any>;
  }
  GetPostFeedbackByHiredLaborID(hiredLabourId:number): Observable<any> {
    const url = `${this.taskManagersURL}/api/feedback/hiredLabour`;
    const params = { hiredLabourId: hiredLabourId.toString() };
    return this.http.get(url, {params}) as Observable<any>;
  }  
  DeletePostFeedbackByID(id:number): Observable<any> {
    const url = `${this.taskManagersURL}/api/feedback/delete`;
    const params = { id: id.toString() };
    return this.http.delete(url, {params}) as Observable<any>;
  }
  UpdatePostFeedbackByID(id:number,Data:any): Observable<any> {
    const url = `${this.taskManagersURL}/api/feedback/`;
    const params = { id: id.toString() };
    return this.http.put(url,Data, {params}) as Observable<any>;
  }
  GetFeedBackReport(userId:number): Observable<any> {
    const url = `${this.taskManagersURL}/api/feedback/Feedback-report`;
    const params = { userId: userId.toString() };
    return this.http.get(url,{params}) as Observable<any>;
  }
  getJobPostReport(userId:number): Observable<any> {
    const url = `${this.taskManagersURL}/api/job-posts/job-posting-report`;
    const params = { userId: userId.toString() };
    return this.http.get(url,{params}) as Observable<any>;
  }
}
