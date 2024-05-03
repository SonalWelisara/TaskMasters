import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqSectionComponent } from './components/faq-section/faq-section.component';

const routes: Routes = [{ path: '', component: FaqSectionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqSectionRoutingModule { }
