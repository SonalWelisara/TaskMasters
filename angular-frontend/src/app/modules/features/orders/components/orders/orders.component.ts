import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'user_id', 'address', 'status', 'action'];
  dataSource = new MatTableDataSource<any>(); // Use MatTableDataSource

  @ViewChild(MatSort, {static: true}) sortOrders!: MatSort;

  constructor(
    private orderService: OrderService,
    private router: Router,
  ) { }
  
  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    this.orderService.getOrders().subscribe((orders: any) => {
      if (orders.status === 200) {
        const formattedOrders = orders.data.map((order: any) => ({
          id: order.id, user_id: order.user.id, address: order.address, status: order.status
        }));
        this.dataSource.data = formattedOrders; // Assign data to dataSource.data
        this.dataSource.sort = this.sortOrders; // Ensure sort is assigned after data
      }
    });
  }
  applyFilterOrder(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  assignOrder(order: any) {
      this.router.navigate(['/admin/drivers']);
  }
}
