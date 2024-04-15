import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreNavBarComponent } from './Pages/Admin/store-nav-bar/store-nav-bar.component';
import { GetAllProductComponent } from './Pages/Admin/get-all-product/get-all-product.component';
import { AddProductComponent } from './Pages/Admin/add-product/add-product.component';
import { UpdateItemComponent } from './Pages/Admin/update-item/update-item.component';

const routes: Routes = [
  
  {
    //change this path
    path:"",
    component:GetAllProductComponent
  },
  {
    path:"addStoreItem",
    component:AddProductComponent
  },
  {
    path:"update-Store-Item/:id",
    component:UpdateItemComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
