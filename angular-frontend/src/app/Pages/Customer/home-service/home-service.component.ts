import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-service',
  templateUrl: './home-service.component.html',
  styleUrl: './home-service.component.scss'
})
export class HomeServiceComponent {
  constructor(
    private router:Router
  ){}

  goToHome(){
    this.router.navigateByUrl("");
  }
  goToHomeAbout(){
    this.router.navigateByUrl("homeAbout");

  }
  goToHomeService(){
    this.router.navigateByUrl("homeService");
  }
  goToHomeContactUs(){
    this.router.navigateByUrl("homeContactUs");

  }


}
