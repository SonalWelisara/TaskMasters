import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AdminService } from '../../../service/admin.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})


export class DashboardComponent  {

	constructor(private adminService: AdminService) { }

  public chart: any;
  paymentsData!: any[];

  ngOnInit(): void {
    this.loadPaymentsData();
  }

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     this.createChart();
  //     this.fetchData();
  //   }, 0);
  // }


  // createChart() {
  //   this.chart = new Chart("MyChart", {
  //     type: 'line',
  //     data: {
  //       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  //       datasets: [
  //         {
  //           label: "Payments In 2024",
  //           data: [13, 16, 21, 28, 32, 34, 32, 31, 30, 26, 20, 14],
  //           borderColor: 'rgb(255, 99, 132)',
  //           backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //           borderWidth: 2,
  //           pointBackgroundColor: 'rgb(255, 99, 132)',
  //           // pointBackgroundColor: 'rgb(54, 162, 235)',
  //         },
  //       ]
  //     },
  //     options: {
  //       aspectRatio: 2.5,
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //           grid: {
  //             color: 'rgba(0, 0, 0, 0.1)',
  //           }
  //         },
  //         x: {
  //           grid: {
  //             color: 'rgba(0, 0, 0, 0.1)',
  //           }
  //         }
  //       },
  //       plugins: {
  //         tooltip: {
  //           backgroundColor: 'rgba(0, 0, 0, 0.7)',
  //           bodyFont: {
  //             size: 14,
  //           },
  //           titleFont: {
  //             size: 16,
  //             weight: 'bold',
  //           }
  //         },
  //         legend: {
  //           labels: {
  //             font: {
  //               size: 14,
  //             }
  //           }
  //         }
  //       ,
  //       }
  //     }
  //   });
  // }

  // fetchData() {
  //   const year = new Date().getFullYear(); // Assuming you want to get data for the current year
  //   this.adminService.getPaymentByMonth(year).subscribe(data => {
  //     // Assuming the data is an array of objects with 'month' and 'payment' properties
  //     const months = data.map(item => item.month);
  //     const payments = data.map(item => item.payment);

  //     this.chart.data.labels = months;
  //     this.chart.data.datasets[0].data = payments;
  //     this.chart.update();
  //     console.log(months);
  //     console.log(payments)
  //   });
  // }

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

}
