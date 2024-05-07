import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../employee';
import { EmployeeService } from '../../../../employee.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
  // Import FeedbackService

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  firstNameSearch: string = '';

  constructor(
    private employeeService: EmployeeService,
      // Inject FeedbackService
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data;
    });
  }

  updateEmployee(id: number | undefined) {
    if (id !== undefined) {
        this.router.navigate(['update-employee', id]);
    }
  }

  deleteEmployee(id: number | undefined): void {
    if (id) {
      this.employeeService.deleteEmployee(id).subscribe(
        data => {
          console.log('Employee deleted successfully:', data);
          this.getEmployees();
        },
        error => {
          console.error('Error deleting employee:', error);
        }
      );
    } else {
      console.error('No id provided.');
    }
  }

  employeedetails(id: number | undefined) {
    this.router.navigate(['employee-details', id]);
  }

  filterEmployees() {
    if (this.firstNameSearch.trim() === '') {
      this.filteredEmployees = this.employees;
    } else {
      this.filteredEmployees = this.employees.filter(employee =>
        employee && employee.firstName && employee.firstName.toLowerCase().includes(this.firstNameSearch.toLowerCase())
      );
    }
  }

  // Method to get feedbacks by employee ID
 
}
