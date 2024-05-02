import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';


const routes: Routes = [
  { path: '', component: LayoutComponent, loadChildren: () => import('./layouts/layout/layout-routing.module').then(m => m.LayoutRoutingModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
