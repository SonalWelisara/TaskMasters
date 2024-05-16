import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/Admin/layout/layout.component';


//
import { MemberLayoutComponent } from './modules/core/components/member-layout/member-layout.component';
import { AdminLayoutComponent } from './modules/core/components/admin-layout/admin-layout.component';




const routes: Routes = [
  { path: 'admin', component: LayoutComponent, loadChildren: () => import('./pages/Admin/layout/layout-routing.module').then(m => m.LayoutRoutingModule) },

  { path: 'storeadmin',  loadChildren: () => import('./pages/StoreAdmin/store-admin-routing.module').then(m => m.StoreAdminRoutingModule) },

  { path: 'user',  loadChildren: () => import('./pages/Customer/user-routing.module').then(m=> m.UserRoutingModule)},


  //
  {
    path: '',
    component: MemberLayoutComponent,
    children: [
      { path: '', redirectTo: '/homepage', pathMatch: 'full' }, // Default route
      {
        path: 'homepage',
        loadChildren: () =>
          import('./modules/features/homepage/homepage.module').then(
            (m) => m.HomepageModule
          ),
      },
      {
        path: 'job-feedback-management',
        loadChildren: () =>
          import(
            './modules/features/job-feedback-management/job-feedback-management.module'
          ).then((m) => m.JobFeedbackManagementModule),
      },
      {
        path: 'faq-section',
        loadChildren: () =>
          import('./modules/features/faq-section/faq-section.module').then(
            (m) => m.FaqSectionModule
          ),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('./modules/features/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: 'hire-management',
        loadChildren: () =>
          import(
            './modules/features/hire-management/hire-management.module'
          ).then((m) => m.HireManagementModule),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/features/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./modules/features/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'job-post',
    loadChildren: () =>
      import('./modules/features/job-post/job-post.module').then(
        (m) => m.JobPostModule
      ),
  },
  {
    path: 'job-feedback-management',
    loadChildren: () =>
      import(
        './modules/features/job-feedback-management/job-feedback-management.module'
      ).then((m) => m.JobFeedbackManagementModule),
  },
  {
    path: 'faq-section',
    loadChildren: () =>
      import('./modules/features/faq-section/faq-section.module').then(
        (m) => m.FaqSectionModule
      ),
  },
  {
    path: 'user-profile',
    loadChildren: () =>
      import('./modules/features/user-profile/user-profile.module').then(
        (m) => m.UserProfileModule
      ),
  },
  {
    path: 'hire-management',
    loadChildren: () =>
      import('./modules/features/hire-management/hire-management.module').then(
        (m) => m.HireManagementModule
      ),
  },
  {
    path: 'orderadmin',
    component: AdminLayoutComponent,
    
    children: [
      {
        path: 'orders',
        loadChildren: () => import('./modules/features/orders/orders.module').then(m => m.OrdersModule)
      },
  { path: 'drivers', loadChildren: () => import('./modules/features/drivers/drivers.module').then(m => m.DriversModule) },

    ] 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
