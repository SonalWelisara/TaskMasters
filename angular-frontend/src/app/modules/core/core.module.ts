import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MemberLayoutComponent } from './components/member-layout/member-layout.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { SharedDataService } from './services/shared-data.service';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MemberLayoutComponent,
    AdminLayoutComponent,
    SideNavBarComponent
  ],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    HeaderComponent, FooterComponent
  ],
  providers: [
    SharedDataService
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module');
    }
  }
 }
