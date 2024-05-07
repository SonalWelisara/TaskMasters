import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreItemService } from '../../../service/store-item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  postStoreItemForm !: FormGroup;

  constructor(
    private storeItemService: StoreItemService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.postStoreItemForm = this.fb.group({
      name: [null, [Validators.required]],
      category: [null, [Validators.required]], 
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
    });
  }

  postStoreItem() {
    console.log(this.postStoreItemForm.value);
    this.storeItemService.postStoreItem(this.postStoreItemForm.value).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl("storeadmin")
    });
  }
}
