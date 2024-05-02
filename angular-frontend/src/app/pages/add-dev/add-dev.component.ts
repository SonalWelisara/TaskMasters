import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeveloperService } from '../../service/developer.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-add-dev',
  templateUrl: './add-dev.component.html',
  styleUrl: './add-dev.component.css'
})
export class AddDevComponent {

  emailExists = false;  //authentication 
  usernameExists = false;

  addDevForm !: FormGroup;

  constructor(
    private devService: DeveloperService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService, // Inject AuthService
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

  addDev() {
    console.log(this.addDevForm.value);
    this.devService.addDev(this.addDevForm.value).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl("table")
    });
  }



  // addDev() {
  //   console.log(this.addDevForm.value);
  
  //   // Check if email exists
  //   this.authService.checkEmailExists(this.addDevForm.value.email).subscribe((emailExists) => {
  //     this.emailExists = emailExists;
      
  //     if (!this.emailExists) {
  //       // If email doesn't exist, proceed with adding the developer
  //       this.devService.addDev(this.addDevForm.value).subscribe((res) => {
  //         console.log(res);
  //         this.router.navigateByUrl("table");
  //       });
  //     }
  //   });
  // }
  
  
}
