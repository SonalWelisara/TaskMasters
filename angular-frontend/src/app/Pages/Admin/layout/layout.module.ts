import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { AppModule } from '../../../app.module';
import { NgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ DashboardComponent],
  imports: [ 
    CommonModule,
    LayoutRoutingModule,
    AppModule,
    NgZorroAntdModule,
    NzIconModule,
    ReactiveFormsModule,

   ],
})
export class LayoutModule {}
