import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../../core/services/validation.service';
import { JobPostService } from '../../services/job-post.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../../core/services/shared-data.service';


@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrl: './job-post.component.scss',
  providers: [provideNativeDateAdapter()],


})
export class JobPostComponent {

  isJobPostStep: boolean = false;
  jobPostImage: string = 'assets/images/jobpost.png';
  selectedCategory: string="";
  isSelectCategory:boolean=false;
  userContext: any = '';
 
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private validations: ValidationService,
    private jobPostService: JobPostService,
    private sharedDataService: SharedDataService,
  ) { }

  ngOnInit() {
    this.setUserContextData();
  }

  async setUserContextData(): Promise<void> {
    this.userContext = this.sharedDataService.getContext();
  }

  jobPostForm = new FormGroup({
    category: new FormControl("", Validators.required),
    description: new FormControl(null, Validators.required),
    skills: new FormControl(null, Validators.required),
    date: new FormControl(null, Validators.required),
    location: new FormControl(null, Validators.required),
    budget: new FormControl(null, Validators.required),
  });

  categories: string[] = [
    'Software Engineer',
    'Data Analyst',
    'Project Manager',
    'Network Engineer',
    'Human Resources Specialist',
    'Marketing Manager',
    'Graphic Designer',
    'Accountant',
    'Customer Service Representative',
    'Sales Representative',
  ];

  navigateToJobPostStep(event: Event): void {
console.log(this.selectedCategory)
    if(event) {

      this.isJobPostStep = true;
    }
  }


  
  get jForm() {
    return this.jobPostForm.controls;
  }
  jobPost(  ): void {
    if (this.jobPostForm.valid) {
      const category = this.jobPostForm.get('category')?.value;
      const description = this.jobPostForm.get('description')?.value;
      const date = this.jobPostForm.get('date')?.value;
      const skills = this.jobPostForm.get('skills')?.value;
      const location = this.jobPostForm.get('location')?.value;
      const budget = this.jobPostForm.get('budget')?.value;

      const payload = {
        category: category,
        description: description,
        date: date,
        skills: skills,
        location: location,
        budget: budget,
        user: { id: this.userContext.Id }
      };
      this.jobPostService.jobPost(payload).subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.toastr.success('Job posted successfully!', 'Success')
            this.NavigateToJobListing();
          } else {
            this.toastr.error(
              'Error in Jpb Posting',
              'Error' // other error messages want to consider
            );
            
          }
        },
        error: (error: any) => {
          this.toastr.error('Error in Job posting', 'Error');
          
        },
        
      });
    } else {
      this.toastr.error('Please fill out all required fields', 'Error');
    }
  }
  NavigateToJobListing() {
console.log('Navigating to job listing')  
this.router.navigate(['/job-feedback-management']);
  }

  onCategorySelected(event: string): void {
  this.selectedCategory = event; 
  const categoryControl = this.jobPostForm.get('category');
  if (categoryControl) {
    categoryControl.setValue(this.selectedCategory);
  }
  this.isSelectCategory = !(this.selectedCategory === '');
}
}
