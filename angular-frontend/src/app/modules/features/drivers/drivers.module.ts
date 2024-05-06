import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriversRoutingModule } from './drivers-routing.module';
import { DriversComponent } from './components/drivers/drivers.component'
import { SharedModule } from '../../shared/shared.module';
import { DriverManageModalComponent } from './components/driver-manage-modal/driver-manage-modal.component';
import { AssignOrderModalComponent } from './components/assign-driver-modal/assign-driver-modal.component';


@NgModule({
  declarations: [
    DriversComponent,
    DriverManageModalComponent,
    AssignOrderModalComponent,
  ],
  imports: [
    CommonModule,
    DriversRoutingModule,
    SharedModule
  ]
})
export class DriversModule { }
