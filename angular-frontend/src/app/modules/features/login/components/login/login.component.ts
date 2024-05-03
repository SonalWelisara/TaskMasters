import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../../core/services/shared-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../../core/services/validation.service';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isForgotPassEvent: boolean = false;
  isSendForgotPassDetails: boolean = false;
  isLoggedIn: boolean = false;
  isLoading: boolean = false;
  userContext: any = '';
  constructor(
    private router: Router,
    private sharedService: SharedDataService,
    private validations: ValidationService,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl(
      null,
      Validators.compose([Validators.required, this.validations.validEmail()])
    ),
    password: new FormControl(null, Validators.required),
  });

  forgotPassDetailsForm = new FormGroup({
    email: new FormControl(
      null,
      Validators.compose([Validators.required, this.validations.validEmail()])
    ),
  });

  resetPasswordForm = new FormGroup({
    token: new FormControl(null, Validators.required),
    newPassword: new FormControl(null, Validators.required),
  });

  get lForm() {
    return this.loginForm.controls;
  }
  get fForm() {
    return this.forgotPassDetailsForm.controls;
  }
  get rForm() {
    return this.resetPasswordForm.controls;
  }

  navigateToRegister(event: Event): void {
    if (event) {
      this.router.navigate(['/register']);
    }
  }

  navigateToHome(): void {
    this.isLoggedIn = true;
    this.sharedService.setData(this.isLoggedIn);
    this.router.navigate(['/homepage']);
  }
  navigateToADMIN(): void {
    this.isLoggedIn = true;
    this.sharedService.setData(this.isLoggedIn);
    this.router.navigate(['/admin/drivers']);
  }


  navigateForgotPassword(event: Event): void {
    if (event) {
      this.isForgotPassEvent = true;
    }
  }

  sendForgotPassDetails(event: Event): void {
    if (event) {
      this.isSendForgotPassDetails = true;
      //call to the forgot pass API
    }
  }

  navigateToLogin(): void {
    this.isForgotPassEvent = false;
    this.isSendForgotPassDetails = false;
    this.router.navigate(['/login']);
  }
  async setUserContextData(): Promise<void> {
    this.userContext = this.sharedService.getContext();
  }


  onSubmitLoginForm(loginFormDetails: any) {
    if (this.loginForm.valid) {
      const loginInfo = {
        email: loginFormDetails?.value?.email,
        password: loginFormDetails?.value?.password,
      };
      this.loginService.login(loginInfo).subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            const accessToken = response?.data?.access_token;
            const decodedToken = jwtDecode(accessToken);
            console.log(decodedToken);
            this.sharedService.setContext(decodedToken);
            this.sharedService.setLoginStatus(true);
            this.toastr.success('Logged in successfully', 'Success');

            this.setUserContextData();
            const Roles = this.userContext.Roles;
            console.log("first",Roles)
            if (Roles === 'ADMIN') {
              this.navigateToADMIN()
            }else{
              this.navigateToHome();
            }
            // this.navigateToHome();
          } else {
            this.toastr.error('Error in user authentication', 'Error');
          }
        },
        error: (error) => {
          if (error.status === 401) {
            this.toastr.error(
              'Authentication failed',
              'Error' // other error messages want to consider
            );
          } else {
            this.toastr.error('Error in user authentication', 'Error');
          }
        },
      });
    } else {
    }
  }

  onSubmitForgotPassForm(forgotPassFormDetails: any) {
    if (this.forgotPassDetailsForm.valid) {
      const email = forgotPassFormDetails?.value?.email;
      this.isLoading = true;
      this.loginService.forgotPassDetails(email).subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.toastr.success(
              'Token sent to the email successfully',
              'Success'
            );
            this.isSendForgotPassDetails = true;
          } else {
            this.toastr.error('Error in sending token to email', 'Error');
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.toastr.error('Error in sending token to email', 'Error');
          this.isLoading = false;
        },
      });
    } else {
    }
  }

  onSubmitResetPassForm(resetPasswordFormDetails: any) {
    if (this.resetPasswordForm.valid) {
      const token = resetPasswordFormDetails?.value?.token;
      const newPassword = resetPasswordFormDetails?.value?.newPassword;
      this.loginService.resetPassword(token, newPassword).subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.toastr.success('Password reset successfully', 'Success');
            this.navigateToLogin();
          } else {
            this.toastr.error('Error in resetting the email', 'Error');
          }
        },
        error: (error) => {
          if (error.status === 400) {
            this.toastr.error('Invalid token', 'Error');
          } else {
            this.toastr.error('Error in resetting the email', 'Error');
          }
        },
      });
    } else {
    }
  }
}
