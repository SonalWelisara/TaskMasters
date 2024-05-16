import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AdminService } from '../../../service/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})


export class DashboardComponent  {

	constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) { }

  public chart: any;
  paymentsData!: any[];

  empRatings!: FormGroup;
  itemRatings!: FormGroup;


  ngOnInit(): void {
    this.loadPaymentsData();
    this.initializeForm();
    this.getMostRatedEmp();
    this.getMostRatedItem();
  }

  
  loadPaymentsData() {
    const year = new Date().getFullYear(); // You can change this to the desired year
    this.adminService.getPaymentByMonth(year)
      .subscribe(data => {
        // Process data to extract months and payments
        this.paymentsData = data.map(item => ({
          month: item[0],
          payment: item[1]
        }));
        this.renderChart();
      });
  }

  renderChart() {

    this.paymentsData.sort((a, b) => a.month - b.month);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const months = this.paymentsData.map(item => monthNames[item.month - 1]);

    //const months = this.paymentsData.map(item => item.month);
    const payments = this.paymentsData.map(item => item.payment);

    this.chart = new Chart("MyChart", {
          type: 'line',
          data: {
            labels: months,
            datasets: [
              {
                label: "Sales in 2024",
                data: payments,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                pointBackgroundColor: 'rgb(255, 99, 132)',
                // pointBackgroundColor: 'rgb(54, 162, 235)',
              },
            ]
          },
          options: {
            aspectRatio: 2.5,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                }
              },
              x: {
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                }
              }
            },
            plugins: {
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                bodyFont: {
                  size: 14,
                },
                titleFont: {
                  size: 16,
                  weight: 'bold',
                }
              },
              legend: {
                labels: {
                  font: {
                    size: 14,
                  }
                }
              }
            ,
            }
          }
        });
  }

  initializeForm() {
    this.empRatings = this.fb.group({
      id: [''],
      firstname: [''],
      lastname: [''],
      email: [''],
      mobile: ['']
    });

    this.itemRatings = this.fb.group({
      id: [''],
      name: [''],
      price: [''],
      category: [''],
      avgRating: ['']
    });
  }

  getMostRatedItem() {
    this.adminService.getItemRating().subscribe((res) => {
      console.log(res);
      this.itemRatings.patchValue({
        id: res.id,
        name: res.name,
        price: res.price,
        category: res.category,
        avgRating: res.avgRating
      });
    });
  }

  getMostRatedEmp() {
    this.adminService.getEmpRating().subscribe((res) => {
      console.log(res);
      this.empRatings.patchValue({
        id: res.id,
        firstname: res.firstname,
        lastname: res.lastname,
        email: res.email,
        mobile: res.mobile
      });
    });
  }

}
