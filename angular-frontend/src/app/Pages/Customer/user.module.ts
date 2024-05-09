import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FeedbackAndRatingComponent } from './feedback-and-rating/feedback-and-rating.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BiddingfaceComponent } from './biddingface/biddingface.component';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [
    FeedbackAndRatingComponent,
    BiddingfaceComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class UserModule { }
