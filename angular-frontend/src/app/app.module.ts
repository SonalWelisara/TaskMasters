import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetAllProductComponent } from './Pages/Admin/get-all-product/get-all-product.component';
import { AddProductComponent } from './Pages/Admin/add-product/add-product.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UpdateItemComponent } from './Pages/Admin/update-item/update-item.component';
import { HomeComponent } from './Pages/Customer/home/home.component';
import { HomeServiceComponent } from './Pages/Customer/home-service/home-service.component';
import { HomeAboutComponent } from './Pages/Customer/home-about/home-about.component';

import { CustomerNavBarComponent } from './Pages/Customer/customer-nav-bar/customer-nav-bar.component';
import { StoreHomeComponent } from './Pages/Customer/store-home/store-home.component';
import { StoreHomeLayoutComponent } from './Pages/Customer/store-home-layout/store-home-layout.component';
import { StoreAddCartComponent } from './Pages/Customer/store-add-cart/store-add-cart.component';
import { HomeFooterComponent } from './Pages/Customer/home-footer/home-footer.component';
import { StoreNavBarComponent } from './Pages/Customer/store-nav-bar/store-nav-bar.component';
import { StoreProductDiscriptionComponent } from './Pages/Customer/store-product-discription/store-product-discription.component';
import { TempUserComponent } from './Pages/Customer/temp-user/temp-user.component';
import { BiddingComponent } from './Pages/Customer/bidding/bidding.component';
import { BiddingAdminComponent } from './Pages/Customer/bidding-admin/bidding-admin.component';
import { BiddingUpdateComponent } from './Pages/Customer/bidding-update/bidding-update.component';

@NgModule({
  declarations: [
    AppComponent,
    GetAllProductComponent,
    AddProductComponent,
    UpdateItemComponent,
    HomeComponent,
    HomeServiceComponent,
    HomeAboutComponent,
  
    CustomerNavBarComponent,
    StoreHomeComponent,
    StoreHomeLayoutComponent,
    StoreAddCartComponent,
HomeFooterComponent,   
    StoreNavBarComponent,
    StoreProductDiscriptionComponent,
    TempUserComponent,
    BiddingComponent,
    BiddingAdminComponent,
    BiddingUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
