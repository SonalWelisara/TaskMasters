import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseURL = "http://localhost:8086/api/v1/employees";
  private baseURL2 = "http://localhost:8086/api/v1/";
  private loginUrl = "http://localhost:8086/api/v1";
  private feedbackURL = "http://localhost:8086/api/v1/feedback"; 

  constructor(private httpClient: HttpClient, private http: HttpClient) { }

  getEmployeesList(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}`);
  }

  createEmployee(employee: Employee): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, employee);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  login(credentials: any): Observable<string> {
    return this.http.post<any>(`${this.loginUrl}/login2`, credentials)
      .pipe(
        map(response => response.message)
      );
  }

  isEmailRegistered(email: string): Observable<boolean> {
    return this.http.get<boolean>(`/api/v1/employees/checkEmail?email=${email}`);
  }

  getFeedbackByEmployeeId(employeeId: number): Observable<EmpFeedback[]> {
    return this.http.get<EmpFeedback[]>(`${this.baseURL}/feedback/${employeeId}`);
  }

  saveFeedback(empFeedback: EmpFeedback): Observable<EmpFeedback> {
    return this.httpClient.post<EmpFeedback>(`${this.feedbackURL}`, empFeedback);
  }
  
}

export class EmpFeedback {
  id: number;
  employeeId: number;
  feedback: string;

  constructor(id: number, employeeId: number, feedback: string) {
      this.id = id;
      this.employeeId = employeeId;
      this.feedback = feedback;
  }
}
