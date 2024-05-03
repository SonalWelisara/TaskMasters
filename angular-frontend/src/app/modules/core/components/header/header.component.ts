import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedDataService } from '../../services/shared-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  sharedServiceData: any;
  subscription!: Subscription;
  hideLoginRegBtn: boolean = false;
  constructor(
    private router: Router,
    private sharedService: SharedDataService,
    private toastr: ToastrService,
  ) {
    this.subscription = new Subscription(); 
  }

  ngOnInit(): void {
    this.setSharedServiceData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setSharedServiceData(): void {
    this.subscription = this.sharedService.data.subscribe((data) => {
      this.sharedServiceData = data;
    });
    if (this.sharedService.getLoginStatus()) {
      this.hideLoginRegBtn = true;
    }
    else {
      this.sharedService.clearStorage();
    }
  }

  navigateToLogin(event: Event): void {
    if (event) {
      this.router.navigate(['/login']);
    }
  }

  navigateToRegister(event: Event): void {
    if (event) {
      this.router.navigate(['/register']);
    }
  }

  navigateToJobFeedback(event: Event): void {
    if (event) {
      this.router.navigate(['/job-feedback-management']);
    }
  }

  navigateToFaq(event: Event): void {
    if (event) {
      this.router.navigate(['/faq-section']);
    }
  }

  navigateToProfileModal(event: Event): void {
    if (event) {
      this.router.navigate(['/user-profile']);
    }
  }

  navigateToHireManagement(event: Event): void {
    if (event) {
      this.router.navigate(['/hire-management']);
    }
  }

  logout(): void {
    this.sharedService.clearStorage();
    this.router.navigate(['/login']);
    this.toastr.success('Logged out successfully!', 'Success')
  }
}
