import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqSectionRoutingModule } from './faq-section-routing.module';
import { FaqSectionComponent } from './components/faq-section/faq-section.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    FaqSectionComponent
  ],
  imports: [
    CommonModule,
    FaqSectionRoutingModule,
    SharedModule
  ]
})
export class FaqSectionModule { }
