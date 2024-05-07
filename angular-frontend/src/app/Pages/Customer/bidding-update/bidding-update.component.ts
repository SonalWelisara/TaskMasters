import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BidingService } from '../../../service/biding.service';

@Component({
  selector: 'app-bidding-update',
  templateUrl: './bidding-update.component.html',
  styleUrl: './bidding-update.component.scss'
})
export class BiddingUpdateComponent {
  updateBid !: FormGroup;
  id !: number ; 
  

  
  
  constructor(
    private activatedRoute :ActivatedRoute,
    private biddingService : BidingService, 
    private fb : FormBuilder , 
    private router :Router
  ){}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.updateBid = this.fb.group({
      bidding_amount: [null, [Validators.required]],
      description: [null, [Validators.required]],
      emp_id: [null, [Validators.required]],
      
    });


}

getBiddingById(){
  this.biddingService.getBidById(this.id).subscribe((res) =>{
    console.log(res);

    this.updateBid.patchValue({
      bidding_amount: res.bidding_amount,
        category: res.category,
        description: res.description, 
        emp_id: res.emp_id,
    })
  })
}

updateBidding(){
  this.biddingService.updateBid(this.id , this.updateBid.value).subscribe((res)=>{
    console.log(res);
    if(res.id != null){
      this.router.navigateByUrl("");
    }
  })
}




}
