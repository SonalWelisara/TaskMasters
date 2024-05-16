import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HireManagementComponent } from './components/hire-management/hire-management.component';

const routes: Routes = [{ path: '', component: HireManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HireManagementRoutingModule { }
