import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member-layout',
  templateUrl: './member-layout.component.html',
  styleUrl: './member-layout.component.scss'
})
export class MemberLayoutComponent implements OnDestroy {

  showFooter = true;
  private subscription!: Subscription;
  hiddenRoutes: string[] = ['/job-feedback-management', '/faq-section', 'user-profile', 'hire-management'];

  constructor(private router: Router) {
    // Subscribe to router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check the current route and decide whether to show the footer or not
        this.showFooter = this.shouldShowFooter(this.router.url);
      }
    });
  }

  shouldShowFooter(url: string): boolean {
    // Check if the current route matches any of the routes where the footer should be hidden
    return !this.hiddenRoutes.some(route => url.includes(route));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
