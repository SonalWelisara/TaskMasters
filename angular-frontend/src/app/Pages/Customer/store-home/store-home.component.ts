import { Component ,OnInit} from '@angular/core';
import { StoreItemService } from '../../../service/store-item.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../modules/core/services/shared-data.service';

@Component({
  selector: 'app-store-home',
  templateUrl: './store-home.component.html',
  styleUrl: './store-home.component.scss'
})
export class StoreHomeComponent {

  userContext: any;

  storeItems:any[]=[];
  constructor( private storeItemService:StoreItemService,private router:Router  ,private sharedDataService: SharedDataService ){}


  ngOnInit() {
    this.setUserContextData();
    this.getAllStoreItem();
    console.log("User Id : " , this.userContext.Id)
  }
 
  async setUserContextData(): Promise<void> {
    this.userContext = this.sharedDataService.getContext();
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
