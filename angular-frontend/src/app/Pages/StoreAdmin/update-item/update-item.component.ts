import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StoreItemService } from '../../../service/store-item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent {

  updateStoreItemFrom!: FormGroup;
  id !: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: StoreItemService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.updateStoreItemFrom = this.fb.group({
      name: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      quantity: [null, [Validators.required]]
    });
  
    this.getStoreItemById();
  }
  
  getStoreItemById() {
    this.service.getStoreItemById(this.id).subscribe((res) => {
      console.log(res); 
     
      this.updateStoreItemFrom.patchValue({
        name: res.name,
        category: res.category,
        description: res.description,
        price: res.price,
        quantity: res.quantity
      });
    });
  }
  


  updateStoreItem() {
    this.service.updateStoreItem(this.id, this.updateStoreItemFrom.value).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        this.router.navigateByUrl("/storeadmin");

      }
    });
  }
}
