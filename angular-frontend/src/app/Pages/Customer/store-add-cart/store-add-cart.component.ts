import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreItemService } from '../../../service/store-item.service';
import { StoreAddCartService } from '../../../service/store-add-cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from '../../../modules/core/services/shared-data.service';



@Component({
  selector: 'app-store-add-cart',
  templateUrl: './store-add-cart.component.html',
  styleUrl: './store-add-cart.component.scss'
})
export class StoreAddCartComponent {

  userContext: any = '';
  addcartdetils : any[] = []; 
  storeid !: number ; 
  updatedStoreCart !:FormGroup ; 


  constructor(private router:Router , 
    private storeItemService:StoreItemService , 
    private storeAddCartService : StoreAddCartService,
    private fb :FormBuilder,
    private sharedDataService: SharedDataService,
    
    
  ){}

  
  ngOnInit(){
    this.setUserContextData();

    this.updatedStoreCart = this.fb.group({
      quantity : [null , [Validators.required]]
    })

    this.getAllAddCartitem();

  }

  async setUserContextData(): Promise<void> {
    this.userContext = this.sharedDataService.getContext();
  }


  getAllAddCartitem() {
    if (this.userContext.Id !== undefined) {
      this.storeAddCartService.getAllStoreCart(this.userContext.Id).subscribe((res) => {
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

  
  






