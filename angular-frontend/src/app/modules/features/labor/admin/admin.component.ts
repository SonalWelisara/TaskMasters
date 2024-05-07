import { Component } from '@angular/core';
 
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../../employee.service';
import { Employee } from '../../../../employee';
import { FormsModule } from '@angular/forms';

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

}
