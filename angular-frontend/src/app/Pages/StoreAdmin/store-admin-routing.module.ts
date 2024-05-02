import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { GetAllProductComponent } from './get-all-product/get-all-product.component';
import { UpdateItemComponent } from './update-item/update-item.component';

const routes: Routes = [
  {
    path: '',
    component: GetAllProductComponent,
  },
  
  
  {
    path:"addStoreItem",
    component:AddProductComponent
  },
  {
    path:"update-Store-Item/:id",
    component:UpdateItemComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreAdminRoutingModule { }
