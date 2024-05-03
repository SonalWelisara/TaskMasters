import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent {
  sharedServiceData: any;

  constructor(
    private router: Router,
    private sharedService: SharedDataService,
    private toastr: ToastrService
  ) {}

  onSignOut() {
    this.sharedService.clearStorage();
    this.router.navigate(['/login']);
    this.toastr.success('Logged out successfully!', 'Success');
  }
}
