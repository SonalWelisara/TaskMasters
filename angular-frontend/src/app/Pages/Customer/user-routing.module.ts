import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiddingAdminComponent } from './bidding-admin/bidding-admin.component';
import { BiddingUpdateComponent } from './bidding-update/bidding-update.component';
import { BiddingComponent } from './bidding/bidding.component';
import { HomeAboutComponent } from './home-about/home-about.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { HomeServiceComponent } from './home-service/home-service.component';
import { HomeComponent } from './home/home.component';
import { StoreAddCartComponent } from './store-add-cart/store-add-cart.component';

import { StoreHomeComponent } from './store-home/store-home.component';
import { StoreProductDiscriptionComponent } from './store-product-discription/store-product-discription.component';
import { TempUserComponent } from './temp-user/temp-user.component';

const routes: Routes = [

  {
    path:"",
    component:TempUserComponent
  },
  { 
    path: 'userHome/:id', 
    component: HomeComponent },
  {
    path:'homeAbout/:id',
    component:HomeAboutComponent
  },

  {
    path:'homeService/:id',
    component:HomeServiceComponent
  },
  {
    path:'storeHome/:id',
    component:StoreHomeComponent
  },

  
  {
    path:'storeCart/:id',
    component:StoreAddCartComponent
  },
  {
    path:"homeFooter",
    component:HomeFooterComponent
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
