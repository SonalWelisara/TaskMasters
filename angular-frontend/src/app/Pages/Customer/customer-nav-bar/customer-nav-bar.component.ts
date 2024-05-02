import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserIdServiceService } from '../../../Service/user-id-service.service';

@Component({
  selector: 'app-customer-nav-bar',
  templateUrl: './customer-nav-bar.component.html',
  styleUrl: './customer-nav-bar.component.css'
})
export class CustomerNavBarComponent {

  userId : number | undefined ; 

  constructor(private router:Router, private useridService : UserIdServiceService){
    this.userId = this.useridService.getUserId();
  }
  

  goToHome(){
    if(this.userId != undefined){
      this.router.navigateByUrl("user/userHome/" + this.userId);
    }
    else{
      console.log("User Id is undefiend")
    }
    
  }
  goToHomeAbout(){
    if(this.userId != undefined){
      this.router.navigateByUrl("user/homeAbout/" + this.userId);
    }
    else{
      console.log("User Id is undefiend")
    }
    

  }
  goToHomeService(){
    if(this.userId != undefined){
      this.router.navigateByUrl("user/homeService/" + this.userId);
    }
    else{
      console.log("User Id is undefiend")
    }
    
  }

  goToHomeBidding() {
    if (this.userId !== undefined) {
      this.router.navigateByUrl("user/bid" );
    } else {
      console.log("User ID is undefined");
      // Handle the case when the user ID is undefined
    }
  }
  
  goToStore(){
    if(this.userId != undefined){
      this.router.navigateByUrl("user/storeHome/" + this.userId);
    }
    else{
      console.log("User Id is undefiend")
    }
  

  }


}
