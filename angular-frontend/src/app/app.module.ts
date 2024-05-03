import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './pages/Admin/layout/layout.component';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TableComponent } from './pages/Admin/table/table.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { IconDefinition } from '@ant-design/icons-angular';
import { DashboardOutline, DatabaseOutline } from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [DashboardOutline, DatabaseOutline];

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UpdateDevComponent } from './pages/Admin/update-dev/update-dev.component';
import { AddDevComponent } from './pages/Admin/add-dev/add-dev.component';
import { GetAllProductComponent } from './pages/StoreAdmin/get-all-product/get-all-product.component';
import { AddProductComponent } from './pages/StoreAdmin/add-product/add-product.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UpdateItemComponent } from './pages/StoreAdmin/update-item/update-item.component';
import { HomeComponent } from './pages/Customer/home/home.component';
import { HomeServiceComponent } from './pages/Customer/home-service/home-service.component';
import { HomeAboutComponent } from './pages/Customer/home-about/home-about.component';
import { StoreHomeComponent } from './pages/Customer/store-home/store-home.component';
import { StoreAddCartComponent } from './pages/Customer/store-add-cart/store-add-cart.component';
import { HomeFooterComponent } from './pages/Customer/home-footer/home-footer.component';

import { StoreProductDiscriptionComponent } from './pages/Customer/store-product-discription/store-product-discription.component';
import { TempUserComponent } from './pages/Customer/temp-user/temp-user.component';
import { BiddingComponent } from './pages/Customer/bidding/bidding.component';
import { BiddingAdminComponent } from './pages/Customer/bidding-admin/bidding-admin.component';
import { BiddingUpdateComponent } from './pages/Customer/bidding-update/bidding-update.component';
import { CustomerNavBarComponent } from './pages/Customer/customer-nav-bar/customer-nav-bar.component';
import { StoreNavBarComponent } from './pages/Customer/store-nav-bar/store-nav-bar.component';

//

import { CoreModule } from './modules/core/core.module';
// import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AuthInterceptor } from './modules/core/interceptors/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarRatingModule } from 'angular-star-rating';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    //sonal
    LayoutComponent,
    TableComponent,
    UpdateDevComponent,
    AddDevComponent,

    //ramith
    GetAllProductComponent,
    AddProductComponent,
    UpdateItemComponent,
    HomeComponent,
    HomeServiceComponent,
    HomeAboutComponent,

    CustomerNavBarComponent,
    StoreHomeComponent,
    StoreAddCartComponent,
    HomeFooterComponent,
    StoreNavBarComponent,
    StoreProductDiscriptionComponent,
    TempUserComponent,
    BiddingComponent,
    BiddingAdminComponent,
    BiddingUpdateComponent


    //


  ],
  imports: [
    BrowserModule,
    NzIconModule.forRoot(icons),
    CommonModule,
    NgZorroAntdModule,
    AppRoutingModule,
    FormsModule,
    NzModalModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,

    //
    CoreModule,
    //HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    StarRatingModule.forRoot()
  
  
  ],

  providers: [
    provideClientHydration(),
    { provide: NZ_I18N, useValue: en_US },
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
