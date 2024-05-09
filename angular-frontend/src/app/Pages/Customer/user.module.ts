import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { PaymentComponent } from './payment/payment.component';
import { BiddingfaceComponent } from './biddingface/biddingface.component';


@NgModule({
  declarations: [
    PaymentComponent,
    BiddingfaceComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
