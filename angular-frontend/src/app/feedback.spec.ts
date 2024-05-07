import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from './feedback';
import { Employee } from './employee';

// Define EmpFeedback interface here
export interface EmpFeedback {
  employee: {
    id: number;
  };
  feedback: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = 'http://localhost:8080/api/v1/feedback';

  constructor(private http: HttpClient) { }

  

  updateFeedback(feedbackId: number, updatedFeedback: Feedback): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.baseUrl}/${feedbackId}`, updatedFeedback);
  }

  deleteFeedback(feedbackId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${feedbackId}`);
  }

  getFeedbackByEmployeeId(employeeId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}/${employeeId}`);
  }

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.baseUrl);
  }

  deleteFeedbacksByEmployeeId(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/employee/${employeeId}`);
  }
  createFeedback(employeeId: number, feedback: string): Observable<EmpFeedback> {
    const payload = {
      id: employeeId,
      feedback: feedback
    };

    return this.http.post<EmpFeedback>(`${this.baseUrl}`, payload);
  }
}
