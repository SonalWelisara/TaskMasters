import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobPostRoutingModule } from './job-post-routing.module';
import { JobPostComponent } from './components/job-post/job-post.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    JobPostComponent
  ],
  imports: [
    CommonModule,
    JobPostRoutingModule,
    SharedModule
  ]
})
export class JobPostModule { }
