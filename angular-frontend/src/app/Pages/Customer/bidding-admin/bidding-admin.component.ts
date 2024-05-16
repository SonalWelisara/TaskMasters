import { Component } from '@angular/core';
import { BidingService } from '../../../service/biding.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bidding-admin',
  templateUrl: './bidding-admin.component.html',
  styleUrl: './bidding-admin.component.scss'
})
export class BiddingAdminComponent {

  bidding : any[] = [] ; 
  constructor(private bidingService : BidingService,
    private router:Router
  ){}


  ngOnInit(){
    this.getAllBidding();
    
  }

  getAllBidding(){
    this.bidingService.getAllBid().subscribe((res)=>{
      console.log(res);
      this.bidding = res ; 
    })
  }

  deleteStoreItem(id:number){
    this.bidingService.deleteBid(id).subscribe((res)=>{
      console.log(res);
      this.getAllBidding();
    })
    
  }

  goToUpdate(b_id : number){
    this.router.navigateByUrl("user/updatebid/"+ b_id)
  }


}


