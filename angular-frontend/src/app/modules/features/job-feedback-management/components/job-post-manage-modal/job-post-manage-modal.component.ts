import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { JobFeedbackManagementService } from '../../services/job-feedback-management.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-post-manage-modal',
  templateUrl: './job-post-manage-modal.component.html',
  styleUrls: ['./job-post-manage-modal.component.scss'],
  providers: [provideNativeDateAdapter()]
})
export class JobPostManageModalComponent {

  jobData: any;
  jobPostForm: FormGroup;

  constructor(
    public modalRef: MdbModalRef<JobPostManageModalComponent>,
    private toastr: ToastrService,
    private jobFeedbackManagementService: JobFeedbackManagementService
  ) {
    this.jobPostForm = new FormGroup({
      id: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      description: new FormControl(null, Validators.required),
      skills: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      budget: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    // Set initial form values
    this.jobPostForm.setValue({
      id: this.jobData.id,
      category: this.jobData.category,
      description: this.jobData.description,
      skills: this.jobData.skills,
      date: this.jobData.date,
      location: this.jobData.location,
      budget: this.jobData.budget
    });
  }

  deleteJobPost(jobId: any): void {
    this.jobFeedbackManagementService.DeleteJobPost(jobId).subscribe(
      (response) => {
        if(response.status === 200){
          this.toastr.success('Job post deleted successfully', 'Success');
          this.modalRef.close();
        }else{
          this.toastr.error('Failed to delete job post', 'Error');
        }
      },
      (error) => {
        console.error('Error updating job post:', error);
        this.toastr.error('Failed to update job post', 'Error');
      }
    )
  
  }

  updateJobPostDetails(): void {
    if (this.jobPostForm.valid) {
      const updatedData = this.jobPostForm.value;
      this.jobFeedbackManagementService.UpdateJobPost(updatedData.id, updatedData).subscribe(
        (response) => {
          this.toastr.success('Job post updated successfully', 'Success');
          this.modalRef.close();
          
        },
        (error) => {
          console.error('Error updating job post:', error);
          this.toastr.error('Failed to update job post', 'Error');
        }
      );
    } else {
      this.toastr.error('Please fill all the fields', 'Error');
    }
  }
}
