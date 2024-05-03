import { Component } from '@angular/core';
import { StoreItemService } from '../../../service/store-item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-all-product',
  templateUrl: './get-all-product.component.html',
  styleUrl: './get-all-product.component.scss'
})
export class GetAllProductComponent {

  storeItems:any[]=[];
  constructor(private storeItemService:StoreItemService, private router : Router){

  }

  ngOnInit(){
    this.getAllStoreItem();
    
  }

  getAllStoreItem(){
    this.storeItemService.getAllStoreItem().subscribe((res)=>{
      console.log(res);
      this.storeItems = res ; 
    })
  }

  deleteStoreItem(id:number){
    this.storeItemService.deleteStoreItem(id).subscribe((res)=>{
      console.log(res);
      this.getAllStoreItem();
    })
  }

  toAllProducts(){
    this.router.navigateByUrl("storeadmin")
  }

}
