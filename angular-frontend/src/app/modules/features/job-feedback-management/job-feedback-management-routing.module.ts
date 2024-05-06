import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobFeedbackManagementComponent } from './components/job-feedback-management/job-feedback-management.component';

const routes: Routes = [{ path: '', component: JobFeedbackManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobFeedbackManagementRoutingModule { }
