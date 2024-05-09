import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreItemService } from '../../../service/store-item.service';
import { StoreAddCartService } from '../../../service/store-add-cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from '../../../modules/core/services/shared-data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  userContext: any = '';
  addcartdetils : any[] = []; 
  storeid !: number ; 

  constructor(private router:Router , 
    private storeItemService:StoreItemService , 
    private storeAddCartService : StoreAddCartService,
    private fb :FormBuilder,
    private sharedDataService: SharedDataService,
    
    
  ){}
  ngOnInit(){
    this.setUserContextData();

    

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





  

    calculateTotalPrice(): number {
      let totalPrice = 0;
      for (const item of this.addcartdetils) {
        totalPrice += item.p_price ;
      }
      return totalPrice;
    }

    // gotoPayment(){
    //   this.router.navigateByUrl("user/payment")
      
    // }


}
