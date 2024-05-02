import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TableComponent } from './pages/table/table.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { IconDefinition } from '@ant-design/icons-angular';
import { DashboardOutline, DatabaseOutline } from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [DashboardOutline, DatabaseOutline];

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UpdateDevComponent } from './pages/update-dev/update-dev.component';
import { AddDevComponent } from './pages/add-dev/add-dev.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    TableComponent,
    UpdateDevComponent,
    AddDevComponent
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
