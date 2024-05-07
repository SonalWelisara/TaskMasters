import { Component, OnInit } from '@angular/core';
  
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../../employee.service';
import { Employee } from '../../../../employee';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  id: number | undefined;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.employeeService.getEmployeeById(this.id).subscribe(
        data => {
          this.employee = data;
        },
        error => {
          console.error('Error fetching employee:', error);
        }
      );
    } else {
      console.error('No id provided.');
    }
  }

  onSubmit() {
    if (this.id) {
      this.employeeService.updateEmployee(this.id, this.employee).subscribe(
        data => {
          this.gotoEmployeeList();
        },
        error => {
          console.error('Error updating employee:', error);
        }
      );
    } else {
      console.error('No id provided.');
    }
  }

  gotoEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
