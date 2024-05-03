import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrderService } from '../../../orders/services/order.service';
import { DriverService } from '../../services/driver.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DriverManageModalComponent } from '../driver-manage-modal/driver-manage-modal.component';
import { ToastrService } from 'ngx-toastr';
import { AssignOrderModalComponent } from '../assign-driver-modal/assign-driver-modal.component';
import jsPDF  from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss'
})
export class DriversComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'address', 'phoneNumber',"action"];

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, {static: true}) sortOrders!: MatSort;
  DriverManageModalRef: MdbModalRef<DriverManageModalComponent> | null = null;
  AssignOrderModalComponentRef:MdbModalRef<AssignOrderModalComponent>|null=null
  constructor(
    
    private modalService: MdbModalService,
    private orderService: OrderService,
    private driverService: DriverService,
    private toastr: ToastrService,

    private router: Router,
  ) { }
  ngOnInit() {
    this.getInitialData();
  }

  openDriverManageModal(element:any){
    this.DriverManageModalRef = this.modalService.open(
      DriverManageModalComponent,
      {
        modalClass: 'modal-lg',
        data: { driverData: element },
      }
    );
    this.DriverManageModalRef.onClose.subscribe((message: any) => {
      //Again hit the get all API
      this.getInitialData()
      console.log('closed');
    });
  }
  getInitialData() {
    this.orderService.getOrders().subscribe((orders: any) => {
      if (orders.status === 200) {
        const formattedOrders = orders.data.map((order: any) => ({
          id: order.id, user_id: order.user.id, address: order.address, status: order.status
        }));
      }
    }
  
  );
  this.driverService.getDriversList().subscribe((drivers: any) => {
    if (drivers.status === 200) {
      this.dataSource = new MatTableDataSource(drivers.data);
      this.dataSource.sort = this.sortOrders;
    }
  });
  }
  applyFilterOrder(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  assignDriver(driver: any) {
     console.log("`driver`", driver)
     this.AssignOrderModalComponentRef = this.modalService.open(
      AssignOrderModalComponent,
      {
        modalClass: 'modal-lg',
        data: { driverId: driver.id ,driverName:driver.name},
      }
    );
    this.AssignOrderModalComponentRef.onClose.subscribe((message: any) => {
      //Again hit the get all API
      this.getInitialData()
      console.log('closed');
    });
    
  }
  updateDriver(driver: any) {
      console.log("`driver`", driver)
  }
  deleteDriver(driver: any) {
    this.driverService.deleteDriver(driver.id).subscribe((res)=>{
    if(res.status===200){
    this.toastr.success("Driver Deleted Successfully")
    this.getInitialData()
    }
    })
  }
  addDriver() {
    this.DriverManageModalRef = this.modalService.open(
      DriverManageModalComponent,
      {
        modalClass: 'modal-lg',
        data: { driverData: null },
      }
    );
    this.DriverManageModalRef.onClose.subscribe((message: any) => {
      //Again hit the get all API
      this.getInitialData()
      console.log('closed');
    });
  }
  
  generateReport() {
    this.driverService.getReportData().subscribe((res) => {
        if (res.status === 200) {
            console.log("res.data", res.data)
            const doc = new jsPDF();
            doc.setFontSize(36);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(233, 30, 99); // RGB equivalent of #e91e63
            doc.text('Task Masters', 50, 35);

            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0); // Black for subheading
            doc.text('Drivers Report', 105, 50); // Centered position

            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Pending Order Count:', 10, 80);
            doc.setFont('helvetica', 'normal');
            doc.text(`${res.data.pendingOrderCount}`, 80, 80);
            doc.setFont('helvetica', 'bold');
            doc.text('Assigned Order Count:', 10, 90);
            doc.setFont('helvetica', 'normal');
            doc.text(`${res.data.totalAssigendOrderCount}`, 80, 90);
            doc.setFont('helvetica', 'bold');
            doc.text('Total Drivers:', 10, 100);
            doc.setFont('helvetica', 'normal');
            doc.text(`${res.data.totalDrivers}`, 80, 100); // Adjusted position for Total Drivers

            const columns = ['Driver ID', 'Email', 'Address', 'Phone Number', 'Order IDs'];
            const dataRows: any[][] = [];
            res.data.driversWithOrders.forEach((driverWithOrders: { driver: any; orderIds: any; }) => {
                const { driver, orderIds } = driverWithOrders;
                const row = [driver.id, driver.email, driver.address, driver.phoneNumber, orderIds.join(', ')];
                dataRows.push(row);
            });

            (doc as any).autoTable({
                head: [columns],
                body: dataRows,
                startY: 120 // Adjusted startY to prevent overlap
            });

            doc.save('driver_report.pdf');
        }
    });
}

}
