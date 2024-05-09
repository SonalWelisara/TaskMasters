import { Component } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import { MenuFoldOutline, UserOutline, TeamOutline } from '@ant-design/icons-angular/icons';
import { Router } from '@angular/router';
import { AdminService } from '../../../service/admin.service';
import jsPDF  from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  isCollapsed = false;

  
  constructor(
    private adminService: AdminService,
    private nzIconService: NzIconService,
    private router : Router
   ) {
    this.nzIconService.addIcon(MenuFoldOutline);
    this.nzIconService.addIcon(UserOutline);
    this.nzIconService.addIcon(TeamOutline);
  }

  totables(){
    this.router.navigateByUrl("admin/table")
  }

  todashboard(){
    this.router.navigateByUrl("admin/dashboard")
  }

  toDevUpdate(){
    this.router.navigateByUrl("admin/updateDev")
  }

  generateReport() {
    this.adminService.getReportData().subscribe((res) => {
        if (res.status === 200) {
            console.log("res.data", res.data)
            const doc = new jsPDF();

            // Heading 
            doc.setFontSize(36);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(233, 30, 99); // RGB equivalent of #e91e63
            doc.text('Task Masters', 50, 35); // Slightly adjusted 'y' position
            

            // Subheading (Centered)
            doc.setFontSize(18);
            doc.setFont('times', 'Bold'); 
            doc.setTextColor(0); // Black for subheading
            doc.text('System Report', 10, 45); // Approximate centering

            // Sections 
            doc.setFontSize(18);
            doc.setFont('times', 'normal'); 
            doc.setTextColor(0); // Black text

            // Details Section
            doc.setFont('times', 'bold');
            doc.text('Details Details', 10, 65); // Adjusted positioning
            doc.line(10, 70, 200, 70); 
            doc.setFontSize(14);
            doc.setFont('times', 'bold');
            doc.text('Total Users:', 10, 80);
            doc.setFont('times', 'normal');
            doc.text(`${res.data.totalUsers}`, 70, 80);
            doc.setFont('times', 'bold');
            doc.text('Total Employees:', 10, 90);
            doc.setFont('times', 'normal');
            doc.text(`${res.data.totalEmp}`, 70, 90);
            doc.setFont('times', 'bold');
            doc.text('Most Rated Item:', 10, 100);
            doc.setFont('times', 'normal');
            doc.text(`${res.data.ratedItem}`, 70, 100);
            doc.setFont('times', 'bold');
            doc.text('Most Rated Employee:', 10, 110);
            doc.setFont('times', 'normal');
            doc.text(`${res.data.ratedEmp}`, 70, 110);
            
            // Profit Section
            doc.setFont('times', 'bold');
            doc.setFontSize(18);
            doc.text('Profit in each month', 10, 125); // Adjusted positioning
            doc.line(10, 130, 200, 130);

            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const columns = ['Month', 'Total Payments'];
            const dataRows: any[][]=[];
            res.data.payments.forEach((payment: [number, number]) => {
              const [monthNum, totalAmount] = payment;
              const monthName = monthNames[monthNum-1]
              const row = [monthName, totalAmount];
              dataRows.push(row);
              });

            (doc as any).autoTable({
                head: [columns],
                body: dataRows,
                startY: 135 // Adjusted startY to prevent overlap
            });

            doc.save('dashboard_Report.pdf');
        }
    });
  }

}

