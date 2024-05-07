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

  

}

postbidding (){
  console.log(this.postBiddingForm.value);
  this.bidingService.postBid(this.postBiddingForm.value).subscribe((res)=>{
    console.log(res);
      this.router.navigateByUrl("user/bidadmin")
  })
    
}

  

  

}
