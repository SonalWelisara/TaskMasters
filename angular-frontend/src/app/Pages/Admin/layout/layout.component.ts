import { Component } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import { MenuFoldOutline, UserOutline, TeamOutline } from '@ant-design/icons-angular/icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  isCollapsed = false;

  
  constructor(
    private nzIconService: NzIconService,
    private router : Router
   ) {
    this.nzIconService.addIcon(MenuFoldOutline);
    this.nzIconService.addIcon(UserOutline);
    this.nzIconService.addIcon(TeamOutline);
  }

  totables(){
    this.router.navigateByUrl("admin/table")
  }

  todashboard(){
    this.router.navigateByUrl("admin/dashboard")
  }

  toDevUpdate(){
    this.router.navigateByUrl("admin/updateDev")
  }

}

