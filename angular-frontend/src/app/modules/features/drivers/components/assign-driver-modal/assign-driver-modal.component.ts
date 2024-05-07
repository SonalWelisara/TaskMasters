import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../orders/services/order.service';
@Component({
  selector: 'app-assign-driver-modal',
  templateUrl: './assign-driver-modal.component.html',
  styleUrl: './assign-driver-modal.component.scss'
})

export class AssignOrderModalComponent implements OnInit {
  assignOrderForm: FormGroup;
  remainingOrders: any[] = []; // Array to store remaining orders
  driverId!: string;  // Driver ID passed when opening the modal
  driverName!:string
  constructor(
    public modalRef: MdbModalRef<AssignOrderModalComponent>,
    private toastr: ToastrService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,

  ) {
    this.assignOrderForm = this.formBuilder.group({
      orderId: [null, Validators.required],
      orderAddress: [{ value: null, disabled: true }, Validators.required],
      driverId: [null, Validators.required],
      driverName: [null, Validators.required]  // Can be pre-filled with driverId
    });
  }

  ngOnInit(): void {
    // Set remaining orders and driver ID when modal is initialized
    this.getRemainingOrders();
    this.assignOrderForm.patchValue({ driverId: this.driverId,driverName:this.driverName });

  }

  // Method to fetch remaining orders (can be replaced with an API call)
  getRemainingOrders(): void {
    this.orderService.getOrders().subscribe((res)=>{
      if(res.status===200){
            this.remainingOrders = res.data;  
      }
    })
  }
 // Function to handle order selection from the dropdown
 onOrderSelect(event: Event): void {
  const selectedOrderId = (event.target as HTMLSelectElement).value;
  const selectedOrder = this.remainingOrders.find(order => order.id === +selectedOrderId);
  if (selectedOrder) {
    this.assignOrderForm.patchValue({
      orderAddress: selectedOrder.address
    });
  }
}
  assignOrder(): void {
    if (this.assignOrderForm.valid) {
      // Logic to handle assigning the order
      const selectedOrderId = this.assignOrderForm.value.orderId;
      const selectedDriverId = this.assignOrderForm.value.driverId;
      this.orderService.assignOrder(selectedOrderId,"Assigned",selectedDriverId).subscribe((res)=>{
        if(res.status===200){
          this.toastr.success('Order assigned successfully');
          this.modalRef.close();
        }
      })
    } else {
      this.toastr.error('Please fill all the required fields');
    }
  }
}
