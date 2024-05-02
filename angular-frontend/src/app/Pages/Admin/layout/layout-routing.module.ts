import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TableComponent } from '../table/table.component';
import { UpdateDevComponent } from '../update-dev/update-dev.component';
import { AddDevComponent } from '../add-dev/add-dev.component';

const routes: Routes = [
  {
    path: '',
    //component: DashboardComponent,
    redirectTo: 'dashboard',
    pathMatch: "full"
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path:'table',
    component: TableComponent
  },
  {
    path:'updateDev/:id',
    component: UpdateDevComponent
  },
  {
    path: 'addDev',
    component: AddDevComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
