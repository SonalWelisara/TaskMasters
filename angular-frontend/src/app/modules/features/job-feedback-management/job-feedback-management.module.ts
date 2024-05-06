import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobFeedbackManagementRoutingModule } from './job-feedback-management-routing.module';
import { JobFeedbackManagementComponent } from './components/job-feedback-management/job-feedback-management.component';
import { SharedModule } from '../../shared/shared.module';
import { JobPostManageModalComponent } from './components/job-post-manage-modal/job-post-manage-modal.component';
import { FeedbackManageModalComponent } from './components/feedback-manage-modal/feedback-manage-modal.component';


@NgModule({
  declarations: [
    JobFeedbackManagementComponent,
    JobPostManageModalComponent,
    FeedbackManageModalComponent
  ],
  imports: [
    CommonModule,
    JobFeedbackManagementRoutingModule,
    SharedModule
  ]
})
export class JobFeedbackManagementModule { }
