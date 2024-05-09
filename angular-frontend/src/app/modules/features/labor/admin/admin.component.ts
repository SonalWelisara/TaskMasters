import { Component } from '@angular/core';
 
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../../employee.service';
import { Employee } from '../../../../employee';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../../../../feedback.spec';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  firstNameSearch: string = '';

  constructor(
    private employeeService: EmployeeService,
      // Inject FeedbackService
    private router: Router,
    private feedbackService: FeedbackService
    

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

}
