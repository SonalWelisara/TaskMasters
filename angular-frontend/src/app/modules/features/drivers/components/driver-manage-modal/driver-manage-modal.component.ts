import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-driver-manage-modal',
  templateUrl: './driver-manage-modal.component.html',
  styleUrls: ['./driver-manage-modal.component.scss']
})
export class DriverManageModalComponent implements OnInit {
  driverData:any
  driverForm: FormGroup;
  isUpdate:boolean=false
  constructor(
    public modalRef: MdbModalRef<DriverManageModalComponent>,
    private toastr: ToastrService,
    private driverService: DriverService
  ) {
    this.driverForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      address: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]*$"), // Ensures only numbers are entered
        Validators.minLength(9),
        Validators.maxLength(12)
      ]),
    });
  }

  ngOnInit(): void {
    if(this.driverData){
      console.log(this.driverData)
      this.driverForm.setValue({
        name: this.driverData.name,
        email: this.driverData.email,
        address: this.driverData.address,
        phoneNumber: this.driverData.phoneNumber
      });
      this.isUpdate=true
    }
  }

  handleUpdate():void{
    if (this.driverForm.valid) {
      const payload={
        email: this.driverForm.value.email,
        address: this.driverForm.value.address,
        phoneNumber: this.driverForm.value.phoneNumber,
        name: this.driverForm.value.name
      }

      this.driverService.updateDriver(this.driverData.id,payload).subscribe((res)=>{
        console.log("response Save",res)
        if(res.status===200){
          this.toastr.success("Driver Details Added Success fully")
          this.modalRef.close()
        }
      })
    }else {
      // Iterate over form controls to check for errors
      Object.keys(this.driverForm.controls).forEach(key => {
        const control = this.driverForm.get(key);
        if (control?.invalid) {
          const errorMessage = this.formatValidationErrors(control.errors);
          console.error(`Validation errors for ${key}:`, errorMessage);
          this.toastr.error(errorMessage)
        }
      });
    }
  }
  saveDriver(): void {
    if (this.driverForm.valid) {
      // Logic to handle saving the driver details
      const payload={
        email: this.driverForm.value.email,
        address: this.driverForm.value.address,
        phoneNumber: this.driverForm.value.phoneNumber,
        name: this.driverForm.value.name
      }
      this.driverService.SaveDriver(payload).subscribe((res)=>{
        console.log("response Save",res)
        if(res.status===200){
          this.toastr.success("Driver Details Added Success fully")
          this.modalRef.close()
        }
      })
     
    } else {
      // Iterate over form controls to check for errors
      Object.keys(this.driverForm.controls).forEach(key => {
        const control = this.driverForm.get(key);
        if (control?.invalid) {
          const errorMessage = this.formatValidationErrors(control.errors);
          console.error(`Validation errors for ${key}:`, errorMessage);
          this.toastr.error(errorMessage)
        }
      });
    }
  }

  formatValidationErrors(errors: ValidationErrors | null): string {
    let errorMessage = '';
    if (errors) {
      Object.keys(errors).forEach(key => {
        switch (key) {
          case 'required':
            errorMessage += `Please  Fill  All the Felids.`;
            break;
          case 'email':
            errorMessage += 'Please enter a valid email. ';
            break;
          case 'minlength':
            errorMessage += `Phone Number  must be at least ${errors[key].requiredLength} characters long. `;
            break;
          case 'maxlength':
            errorMessage += `Phone Number cannot exceed ${errors[key].requiredLength} characters. `;
            break;
          case 'pattern':
            errorMessage += 'Invalid input format. ';
            break;
          // Add cases for other validation errors as needed
          default:
            errorMessage += `Validation error: ${key}. `;
            break;
        }
      });
    }
    return errorMessage.trim();
  }
}
