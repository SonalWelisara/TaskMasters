import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../../core/services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private registerService: RegisterService,
    private toastr: ToastrService,
    private validations: ValidationService,
  ) {}

  regVictor: string = 'assets/images/register.png';

  registerForm = new FormGroup({
    fname: new FormControl(null, Validators.required),
    lname: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(
      null,
      Validators.compose([Validators.required, this.validations.validPhone()])
    ),
    email: new FormControl(
      null,
      Validators.compose([Validators.required, this.validations.validEmail()])
    ),
    password: new FormControl(null, Validators.required),
  });

  get rForm() {
    return this.registerForm.controls;
  }

  navigateToLogin(): void {
    if (event) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit(registerFormDetails: any) {
    // Handle form submission
    if (this.registerForm.valid) {
      const registerInfo = {
        fname: registerFormDetails?.value?.fname,
        lname: registerFormDetails?.value?.lname,
        address: registerFormDetails?.value?.address,
        phoneNumber: registerFormDetails?.value?.phoneNumber,
        email: registerFormDetails?.value?.email,
        password: registerFormDetails?.value?.password,
      };

      this.registerService.register(registerInfo).subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.toastr.success(
              'Registered successfully, Thank you!',
              'Success'
            );
            this.navigateToLogin();
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
    } else {
    }
  }
}
