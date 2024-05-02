import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';

//ramith
import { GetAllProductComponent } from './Pages/Admin/get-all-product/get-all-product.component';
import { AddProductComponent } from './Pages/Admin/add-product/add-product.component';
import { UpdateItemComponent } from './Pages/Admin/update-item/update-item.component';
import { HomeComponent } from './Pages/Customer/home/home.component';
import { HomeAboutComponent } from './Pages/Customer/home-about/home-about.component';

import { HomeServiceComponent } from './Pages/Customer/home-service/home-service.component';
import { StoreHomeComponent } from './Pages/Customer/store-home/store-home.component';
import { StoreHomeLayoutComponent } from './Pages/Customer/store-home-layout/store-home-layout.component';
import { StoreAddCartComponent } from './Pages/Customer/store-add-cart/store-add-cart.component';
import { HomeFooterComponent } from './Pages/Customer/home-footer/home-footer.component';
import { StoreProductDiscriptionComponent } from './Pages/Customer/store-product-discription/store-product-discription.component';
import { TempUserComponent } from './Pages/Customer/temp-user/temp-user.component';
import { BiddingComponent } from './Pages/Customer/bidding/bidding.component';
import { BiddingAdminComponent } from './Pages/Customer/bidding-admin/bidding-admin.component';
import { BiddingUpdateComponent } from './Pages/Customer/bidding-update/bidding-update.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, loadChildren: () => import('./layouts/layout/layout-routing.module').then(m => m.LayoutRoutingModule) }

  //jaga
  {
    path:"",
    component:TempUserComponent
  },

  {

    path:"StoreAllProduct",
    component:GetAllProductComponent
  },

  {
    path:"addStoreItem",
    component:AddProductComponent
  },
  {
    path:"update-Store-Item/:id",
    component:UpdateItemComponent
  },

  //user
  { path: 'userHome/:id', component: HomeComponent },
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
    path:'storeHomeLayOut/:id',
    component:StoreHomeLayoutComponent
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
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
