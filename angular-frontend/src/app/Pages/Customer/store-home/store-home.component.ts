import { Component ,OnInit} from '@angular/core';
import { StoreItemService } from '../../../service/store-item.service';
import { Router } from '@angular/router';
import { UserIdServiceService } from '../../../service/user-id-service.service';
import { SharedDataService } from '../../../modules/core/services/shared-data.service';

@Component({
  selector: 'app-store-home',
  templateUrl: './store-home.component.html',
  styleUrl: './store-home.component.scss'
})
export class StoreHomeComponent {
  userId : number | undefined ; 
  userContext: any;

  storeItems:any[]=[];
  constructor( private storeItemService:StoreItemService,private router:Router , private userService : UserIdServiceService ,private sharedDataService: SharedDataService ){
    this.userId = this.userService.getUserId();
  }


  async ngOnInit(): Promise<void> {
    this.setUserContextData();
    this.getAllStoreItem();
  }

 
  setUserContextData() {
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
