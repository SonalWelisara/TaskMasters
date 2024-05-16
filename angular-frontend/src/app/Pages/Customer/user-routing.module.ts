import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiddingAdminComponent } from './bidding-admin/bidding-admin.component';
import { BiddingUpdateComponent } from './bidding-update/bidding-update.component';
import { BiddingComponent } from './bidding/bidding.component';

import { StoreAddCartComponent } from './store-add-cart/store-add-cart.component';
import { StoreHomeComponent } from './store-home/store-home.component';
import { StoreProductDiscriptionComponent } from './store-product-discription/store-product-discription.component';


const routes: Routes = [



  //change path
  {
    path:'storeHome',
    component:StoreHomeComponent
  },

  {
    path:'storeCart',
    component:StoreAddCartComponent
  },
  {
    path:"storeProductDis/:id",
    component:StoreProductDiscriptionComponent
  },




  //bidding
  {
    path:"bid",
    component:BiddingComponent
  },
  {
    path:"bidadmin",
    component:BiddingAdminComponent
  },
  {
    path:"updatebid/:id",
    component: BiddingUpdateComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
