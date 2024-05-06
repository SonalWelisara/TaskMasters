import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HireManagementRoutingModule } from './hire-management-routing.module';
import { HireManagementComponent } from './components/hire-management/hire-management.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    HireManagementComponent
  ],
  imports: [
    CommonModule,
    HireManagementRoutingModule,
    SharedModule
  ]
})
export class HireManagementModule { }
