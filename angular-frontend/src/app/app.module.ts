import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetAllProductComponent } from './Pages/Admin/get-all-product/get-all-product.component';
import { AddProductComponent } from './Pages/Admin/add-product/add-product.component';
import { StoreNavBarComponent } from './Pages/Admin/store-nav-bar/store-nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UpdateItemComponent } from './Pages/Admin/update-item/update-item.component';

@NgModule({
  declarations: [
    AppComponent,
    GetAllProductComponent,
    AddProductComponent,
    StoreNavBarComponent,
    UpdateItemComponent
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
