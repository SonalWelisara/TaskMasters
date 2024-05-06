import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeveloperService } from '../../../service/developer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-dev',
  templateUrl: './add-dev.component.html',
  styleUrl: './add-dev.component.scss'
})
export class AddDevComponent {

  addDevForm !: FormGroup;

  constructor(
    private devService: DeveloperService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.addDevForm = this.fb.group({
      fname: [null, [Validators.required]],
      lname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      contactNo: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  navigateToDashboard(): void {
    if (event) {
      this.router.navigate(['/admin/table']);
    }
  }

  addDev() {
    console.log(this.addDevForm.value);
    this.devService.addDev(this.addDevForm.value).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.toastr.success(
            'Registered successfully, Thank you!',
            'Success'
          );
          this.navigateToDashboard();
        } else {
          this.toastr.error(
            'Error in registration',
            'Error' // other error messages want to consider
          );
        }
      },
      error: (error) => {
        if (error.status === 401) {
          this.toastr.error('Email already exists', 'Error');
        } else {
          this.toastr.error('Error in registration', 'Error');
        }
      },
    });
  }
  
}
