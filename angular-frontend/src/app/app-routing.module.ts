import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/Admin/layout/layout.component';
import { TempUserComponent } from './pages/Customer/temp-user/temp-user.component';




const routes: Routes = [
  { path: 'admin', component: LayoutComponent, loadChildren: () => import('./pages/Admin/layout/layout-routing.module').then(m => m.LayoutRoutingModule) },

  //jaga
  { path: 'storeadmin',  loadChildren: () => import('./pages/StoreAdmin/store-admin-routing.module').then(m => m.StoreAdminRoutingModule) },

  { path: 'user',  loadChildren: () => import('./pages/Customer/user-routing.module').then(m=> m.UserRoutingModule)}

  
  // {
  //   path:"StoreAllProduct",
  //   component:TempUserComponent
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
