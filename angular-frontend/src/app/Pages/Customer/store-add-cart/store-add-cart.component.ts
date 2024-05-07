import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreItemService } from '../../../service/store-item.service';
import { UserIdServiceService } from '../../../service/user-id-service.service';
import { StoreAddCartService } from '../../../service/store-add-cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-store-add-cart',
  templateUrl: './store-add-cart.component.html',
  styleUrl: './store-add-cart.component.scss'
})
export class StoreAddCartComponent {

  addcartdetils : any[] = []; 
  storeid !: number ; 
  updatedStoreCart !:FormGroup ; 

  userId : number | undefined ; 
  constructor(private router:Router , 
    private storeItemService:StoreItemService , 
    private userIdService : UserIdServiceService,
    private storeAddCartService : StoreAddCartService,
    private fb :FormBuilder
    
    
  ){
    this.userId = this.userIdService.getUserId();

  }

  
  ngOnInit(){

    this.updatedStoreCart = this.fb.group({
      quantity : [null , [Validators.required]]
    })

    this.getAllAddCartitem();

  }

  getAllAddCartitem() {
    if (this.userId !== undefined) {
      this.storeAddCartService.getAllStoreCart(this.userId).subscribe((res) => {
        console.log(res);
        this.addcartdetils = res;
      });
    } else {
      console.error('User ID is undefined.');
    }
  }



  deleteStoreCart(id:number ){
    this.storeAddCartService.deleteAddCart(id).subscribe((res)=>{
      console.log(res); 
      this.getAllAddCartitem();
    })
  }

  

    calculateTotalPrice(): number {
      let totalPrice = 0;
      for (const item of this.addcartdetils) {
        totalPrice += item.p_price * item.quantity;
      }
      return totalPrice;
    }
    
  }

  
  






