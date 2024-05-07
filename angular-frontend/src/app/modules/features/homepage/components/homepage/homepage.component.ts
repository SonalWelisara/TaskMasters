import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../../core/services/shared-data.service';
import { share } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {

  userContext: any;

  constructor(private router: Router, private sharedDataService: SharedDataService) {}
  
  async ngOnInit(): Promise<void> {
    this.setUserContextData();
  }

  setUserContextData() {
    this.userContext = this.sharedDataService.getContext();
  }

  carouselImages: string[] = [
    'assets/images/slide1.jpg',
    'assets/images/slide2.jpg',
    'assets/images/slide3.jpg'
  ];

  navigateToJobPosting(event: Event): void {
    if(event) {
      this.router.navigate(['/job-post']);
    }
  }
}


