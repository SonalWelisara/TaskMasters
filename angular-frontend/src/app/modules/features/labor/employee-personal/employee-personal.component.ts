import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../employee';
import { Observable } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
 
 
import { EmployeeService } from '../../../../employee.service';
import { FeedbackService } from '../../../../feedback.spec';

@Component({
  selector: 'app-employee-personal',
  templateUrl: './employee-personal.component.html',
  styleUrls: ['./employee-personal.component.scss']
})
export class EmployeePersonalComponent implements OnInit {
  id!: number; // Definite assignment assertion
  employees: Employee[] = [];
  employee: Employee | undefined;
  
  constructor(private route: ActivatedRoute, 
              private employeeService: EmployeeService,
              private router: Router,
              private feedbackService: FeedbackService) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] ?? 0; // Assign a default value if id is undefined
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    });
  }
  
  deleteEmployee(id: number | undefined): void {
    if (id) {
      this.employeeService.deleteEmployee(id).subscribe(
        data => {
          console.log('Employee deleted successfully:', data);
          this.gotoEmployeeList();
        },
        error => {
          console.error('Error deleting employee:', error);
        }
      );
    } else {
      console.error('No id provided.');
    }
  }
  
  updateEmployee(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['update-employee', id]);
    }
  }
  
  gotoEmployeeList() {
    this.router.navigate(['/employees']);
  }
  
  deleteFeedbacks(employeeId: number | undefined) {
    this.deleteEmployee(employeeId)
    if (employeeId !== undefined) {
      // Call your service method to delete feedbacks by employee ID
      this.feedbackService.deleteFeedbacksByEmployeeId(employeeId).subscribe(
        () => {
           this.deleteEmployee(employeeId)
          console.log('Feedbacks deleted successfully.');
        },
        (error) => {
          // Handle error if deletion fails
          console.error('Error deleting feedbacks:', error);
        }
      );
    } else {
      console.error('No employee ID provided.');
    }
  }
}
