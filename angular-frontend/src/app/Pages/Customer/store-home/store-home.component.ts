import { Component } from '@angular/core';
import { StoreItemService } from '../../../service/store-item.service';
import { Router } from '@angular/router';
import { UserIdServiceService } from '../../../service/user-id-service.service';

@Component({
  selector: 'app-store-home',
  templateUrl: './store-home.component.html',
  styleUrl: './store-home.component.scss'
})
export class StoreHomeComponent {
  userId : number | undefined ; 

  storeItems:any[]=[];
  constructor( private storeItemService:StoreItemService,private router:Router , private userService : UserIdServiceService){
    this.userId = this.userService.getUserId();
  }

  ngOnInit(){
    this.getAllStoreItem();
    
    
  }
  getAllStoreItem(){
    this.storeItemService.getAllStoreItem().subscribe((res)=>{
      console.log(res);
      this.storeItems=res;
    })
  }

  goToAddToCart(storeid : number) {
    
      this.router.navigateByUrl("user/storeProductDis/" + storeid);
    
    
    
   
  }



}
