import { Component } from '@angular/core';
import { SharedDataService } from '../../../../core/services/shared-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../../core/services/validation.service';
import { UserProfileService } from '../../services/user-profile.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  userContext: any = '';

  constructor(
    private sharedDataService: SharedDataService,
    private validations: ValidationService,
    private userProfileService: UserProfileService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  userProfileForm = new FormGroup({
    fname: new FormControl(null, Validators.required),
    lname: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(
      null,
      Validators.compose([Validators.required, this.validations.validPhone()])
    ),
  });

  ngOnInit() {
    this.setUserContextData();
    this.userProfileForm.setValue({
      fname: this.userContext.firstname,
      lname: this.userContext.lastName,
      address: this.userContext.address,
      phoneNumber: this.userContext.mobileNumber,
    });
  }

  async setUserContextData(): Promise<void> {
    this.userContext = this.sharedDataService.getContext();
  }

  get uForm() {
    return this.userProfileForm.controls;
  }

  onSubmit(userProfileFormDetails: any) {
    // Handle form submission
    if (this.userProfileForm.valid) {
      const userProfileInfo = {
        fname: userProfileFormDetails?.value?.fname,
        lname: userProfileFormDetails?.value?.lname,
        address: userProfileFormDetails?.value?.address,
        phoneNumber: userProfileFormDetails?.value?.phoneNumber,
      };

      this.userProfileService
        .updateProfile(this.userContext.sub, userProfileInfo)
        .subscribe({
          next: (response: any) => {
            if (response.status === 200) {
              this.sharedDataService.clearStorage();
              let updatedContext = {
                lastName: userProfileInfo.lname,
                firstname: userProfileInfo.fname,
                address: userProfileInfo.address,
                mobileNumber: userProfileInfo.phoneNumber,
                Roles: this.userContext.Roles,
                Id: this.userContext.Id,
                sub: this.userContext.sub,
                iat: this.userContext.iat,
                exp: this.userContext.exp,
              };
              console.log('updated context', updatedContext);
              this.sharedDataService.setContext(updatedContext);
              this.setUserContextData();
              this.sharedDataService.setLoginStatus(true);
              this.toastr.success('Profile updated successfully', 'Success');
              this.router.navigate(['/user-profile']);
            } else {
              this.toastr.error(
                'Error in updating the profile',
                'Error' // other error messages want to consider
              );
            }
          },
          error: (error) => {
            if (error.status === 404) {
              this.toastr.error('User not found with the email', 'Error');
            } else {
              this.toastr.error('Error in updating the profile', 'Error');
            }
          },
        });
    } else {
    }
  }

  updateProfile(): void {}

  deleteProfile(): void {
    this.userProfileService.deleteProfile(this.userContext.sub).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.sharedDataService.clearStorage();
          this.toastr.success('Profile deleted successfully', 'Success');
          this.router.navigate(['/register']);
        } else {
          this.toastr.error(
            'Error in deleting the profile',
            'Error' // other error messages want to consider
          );
        }
      },
      error: (error) => {
        if (error.status === 404) {
          this.toastr.error('User not found with the email', 'Error');
        } else {
          this.toastr.error('Error in deleting the profile', 'Error');
        }
      },
    });
  }

  generateReport(): void {
    const userId = this.userContext.Id;
    console.log(" Report generated successfully")
     this.userProfileService.getReportDetails(userId).subscribe({
       next: (response: any) => {
         if (response.status === 200) {
           console.log('Report:', response.data);
           const doc = new jsPDF();

           // Heading 
           doc.setFontSize(36);
           doc.setFont('helvetica', 'italic');
           doc.setTextColor(233, 30, 99); // RGB equivalent of #e91e63
           doc.text('Task Masters', 50, 35); // Slightly adjusted 'y' position
           
           // Subheading (Centered)
           doc.setFontSize(18);
           doc.setFont('times', 'Bold'); 
           doc.setTextColor(0); // Black for subheading
           doc.text('User Profile Report', 10, 45); // Approximate centering
           
           // Sections 
           doc.setFontSize(18);
           doc.setFont('times', 'normal'); 
           doc.setTextColor(0); // Black text
           
           // Personal Details Section
           doc.setFont('times', 'bold');
           doc.text('Personal Details', 10, 65); // Adjusted positioning
           doc.line(10, 70, 200, 70); 
           doc.setFontSize(14);
           doc.setFont('times', 'bold');
           doc.text('First Name:', 10, 80);
           doc.setFont('times', 'normal');
           doc.text(response.data.firstName, 70, 80);
           doc.setFont('times', 'bold');
           doc.text('Last Name:', 10, 90);
           doc.setFont('times', 'normal');
           doc.text(response.data.lastName, 70, 90);
           doc.setFont('times', 'bold');
           doc.text('Email:', 10, 100);
           doc.setFont('times', 'normal');

           doc.text(response.data.email, 70, 100);
           doc.setFont('times', 'bold');
           doc.text('Phone Number:', 10, 110);
           doc.setFont('times', 'normal');
           doc.text(response.data.phoneNumber, 70, 110);
           doc.setFont('times', 'bold');
           doc.text('Address:', 10, 120);
           doc.setFont('times', 'normal');
           doc.text(response.data.address, 70, 120);
           doc.setFont('times', 'bold');
           // Activity Section
           doc.setFontSize(18);
           doc.text('Activity', 10, 135); // Adjusted positioning
           doc.line(10, 140, 200, 140);

           doc.setFontSize(14);
           doc.text('Total Post Count:', 10, 150);
           doc.setFont('times', 'normal');
           doc.text(response.data.totalPostCount.toString(), 70, 150);
           doc.setFont('times', 'Bold');
           doc.text('Total Feedback Count:', 10, 160);
           doc.setFont('times', 'normal');
           doc.text(response.data.totalFeedbackCount.toString(), 70, 160);
           
           // Save the PDF
           doc.save('UserProfileReport.pdf');
         } else {
           console.error('Error fetching report:', response);
           this.toastr.error('Error fetching report', 'Error');
         }
       },
       error: (error) => {
         console.error('Error fetching report:', error);
         this.toastr.error('Error fetching report', 'Error');
       },
     });


  
  }
  
}

