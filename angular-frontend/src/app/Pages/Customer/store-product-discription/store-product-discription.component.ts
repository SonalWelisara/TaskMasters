import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreItemService } from '../../../service/store-item.service';
import { StoreAddCartService } from '../../../service/store-add-cart.service';
import { SharedDataService } from '../../../modules/core/services/shared-data.service';


@Component({
  selector: 'app-store-product-discription',
  templateUrl: './store-product-discription.component.html',
  styleUrl: './store-product-discription.component.scss'

})
export class StoreProductDiscriptionComponent implements OnInit{

  ProductDetails!: FormGroup;
  id!: number;
  description!: string ;
  
  userContext: any = '';

  constructor(
    private activaterRoute: ActivatedRoute,
    private storeItemService: StoreItemService,
    private sharedDataService: SharedDataService,
    private fb: FormBuilder,
    private router: Router,
    private storeAddCart: StoreAddCartService
  ) {}

  ngOnInit() {
    this.setUserContextData();
    this.id = this.activaterRoute.snapshot.params['id'];
    this.initializeForm();
    this.getStoreItemById();
    console.log("User Id : " , this.userContext.Id)
    
  }
  async setUserContextData(): Promise<void> {
    this.userContext = this.sharedDataService.getContext();
  }

  initializeForm() {
    this.ProductDetails = this.fb.group({
      name: [''],
      category: [''],
    
      price: [],
      quantity: []
    });
  }

  getStoreItemById() {
    this.storeItemService.getStoreItemById(this.id).subscribe((res) => {
      console.log(res);
      this.ProductDetails.patchValue({
        name: res.name,
        category: res.category,
        price: res.price,
        quantity: res.quantity
      });
      
      this.description = res.discription;
      console.log(this.description);
    });
  }
 
  
  
  
  

  gotoAddToCart() {
    if (this.userContext.Id) {
      const cartItem = {
        user: this.userContext.Id,
        storeItem: this.id,
        quantity:this.ProductDetails.value.quantity,
        p_name : this.ProductDetails.value.name , 
        p_price : this.ProductDetails.value.price
      };

      console.log(cartItem )

      this.storeAddCart.postStoreAddCart(cartItem).subscribe((response) => {
        console.log('Item added to cart:', response);
        this.router.navigateByUrl("user/storeCart"); 
      }, (error) => {
        console.error('Error adding item to cart:', error);
      });
    } else {
      console.error('User ID is not available.');
    }
  }
}