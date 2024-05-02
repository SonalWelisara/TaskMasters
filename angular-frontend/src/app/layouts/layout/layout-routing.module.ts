import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { TableComponent } from '../../pages/table/table.component';
import { UpdateDevComponent } from '../../pages/update-dev/update-dev.component';
import { AddDevComponent } from '../../pages/add-dev/add-dev.component';

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
