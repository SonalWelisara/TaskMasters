import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../../../../employee';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.scss']
})
export class EmployeeLoginComponent {
  employee: Employee = new Employee();
  errorMessage!: string; // Definite assignment assertion

  constructor(private http: HttpClient, private router: Router) {}

  employeedetails(id: number | undefined) {
    this.router.navigate(['employee-personal', id]);
  }

  login() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post<Employee>('http://localhost:8086/api/v1/login2', this.employee, httpOptions)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          this.errorMessage = 'Invalid email or password. Please try again.';
          return throwError(error);
        })
      )
      .subscribe(
        (response: Employee) => {
          // Login successful
          console.log('Login successful!', response);
          // Assuming you have some identifier in the response for the logged-in user, e.g., 'id'
          this.employeedetails(response.id);
        }
      );
  }
}
