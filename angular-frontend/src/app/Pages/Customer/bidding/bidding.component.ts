import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BidingService } from '../../../service/biding.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrl: './bidding.component.scss'
})
export class BiddingComponent {

  postBiddingForm !: FormGroup ; 
  bidding : any[] = [] ; 
  
constructor(
  private bidingService : BidingService,
  private fb : FormBuilder,
  private router : Router
){}

ngOnInit(){

  this.postBiddingForm = this.fb.group({
    bidding_amount: [null , [Validators.required]],
    description: [null , [Validators.required]],
    emp_id: [null , [Validators.required]],
  })

  this.getAllBidding();

  

}

postbidding (){
  console.log(this.postBiddingForm.value);
  this.bidingService.postBid(this.postBiddingForm.value).subscribe((res)=>{
    console.log(res);
    this.getAllBidding(); 
  })
    
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

gotoEdit(){
  this.router.navigateByUrl("user/bidadmin/")

}


}





  

  


