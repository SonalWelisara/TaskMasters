import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreNavBarComponent } from './Pages/Admin/store-nav-bar/store-nav-bar.component';

const routes: Routes = [
  {
    path:"storenav",
    component:StoreNavBarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
