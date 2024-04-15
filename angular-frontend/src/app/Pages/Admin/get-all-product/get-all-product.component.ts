import { Component } from '@angular/core';
import { StoreItemService } from '../../../Service/store-item.service';

@Component({
  selector: 'app-get-all-product',
  templateUrl: './get-all-product.component.html',
  styleUrl: './get-all-product.component.css'
})
export class GetAllProductComponent {

  storeItems:any[]=[];
  constructor(private storeItemService:StoreItemService){

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

}
