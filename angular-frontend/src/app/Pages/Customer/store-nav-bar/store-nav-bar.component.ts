import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserIdServiceService } from '../../../Service/user-id-service.service';

@Component({
  selector: 'app-store-nav-bar',
  templateUrl: './store-nav-bar.component.html',
  styleUrl: './store-nav-bar.component.css'
})
export class StoreNavBarComponent {

  userId : number | undefined ; 

  constructor(private router:Router , private useridService : UserIdServiceService ){
    this.userId = this.useridService.getUserId();
  }

  goToHome(){
    if(this.userId != undefined){
      this.router.navigateByUrl("userHome/" + this.userId);
    }
    else{
      console.log("User Id is undefiend")
    }
    
  }
  goToOrder(){
    this.router.navigateByUrl("");

  }
  
  goToAddCart(){
    if(this.userId != undefined){
      this.router.navigateByUrl("storeCart/" + this.userId);
    }
    else{
      console.log("User Id is undefiend")
    }
    

  }
  goToStore(){
    if(this.userId != undefined){
      this.router.navigateByUrl("storeHome/" + this.userId);
    }
    else{
      console.log("User Id is undefiend")
    }
    
   

  }



}
