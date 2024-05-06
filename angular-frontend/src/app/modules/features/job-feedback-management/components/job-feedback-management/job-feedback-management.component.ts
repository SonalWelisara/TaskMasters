import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JobPostManageModalComponent } from '../job-post-manage-modal/job-post-manage-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FeedbackManageModalComponent } from '../feedback-manage-modal/feedback-manage-modal.component';
import { JobFeedbackManagementService } from '../../services/job-feedback-management.service';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from '../../../../core/services/shared-data.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-job-feedback-management',
  templateUrl: './job-feedback-management.component.html',
  styleUrl: './job-feedback-management.component.scss',
})
export class JobFeedbackManagementComponent implements OnInit {
  constructor(
    private modalService: MdbModalService,
    private toastr: ToastrService,
    private jobFeedbackService: JobFeedbackManagementService,
    private sharedDataService: SharedDataService, // Inject the service
  ) {}

  jobPosts: any[] = [];
  userContext: any = '';

  feedbacks: any = [
    { id: 1, review: 'Good labor', rating: 4 },
    { id: 2, review: 'Bad labor', rating: 1 },
    { id: 3, review: 'Normal labor', rating: 3 },
  ];

  feedbackData: any ;

  displayedJobManagementColumns: string[] = [
    'id',
    'category',
    'description',
    'skills',
    'date',
    'location',
    'budget',
    'status',
    'action',
    'feedback',
  ];

  displayedFeedbackManagementColumns: string[] = [
    'id',
    'review',
    'rating',
    "serviceType"
  ];

  dataSourceJobManagement = new MatTableDataSource(this.jobPosts);
  dataSourceFeedbackManagement = new MatTableDataSource(this.feedbacks);
  @ViewChild(MatSort) sortJobPosts!: MatSort;
  @ViewChild(MatSort) sortFeedbacks!: MatSort;

  jobManageModalRef: MdbModalRef<JobPostManageModalComponent> | null = null;
  feedbackManageModalRef: MdbModalRef<FeedbackManageModalComponent> | null =
    null;



  ngAfterViewInit() {
    this.dataSourceJobManagement.sort = this.sortJobPosts;
    this.dataSourceFeedbackManagement.sort = this.sortFeedbacks;
  }

  applyFilterJobManagement(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceJobManagement.filter = filterValue.trim().toLowerCase();
  }

  applyFilterFeedbackManagement(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFeedbackManagement.filter = filterValue.trim().toLowerCase();
  }

  openJobPostManageModal(element: any): void {
    this.jobManageModalRef = this.modalService.open(
      JobPostManageModalComponent,
      {
        modalClass: 'modal-lg',
        data: { jobData: element },
      }
    );
    this.jobManageModalRef.onClose.subscribe((message: any) => {
      //Again hit the get all API
      this.getAllJobPostsByUserId()
      console.log('closed');
    });
  }
  ngOnInit(): void {
    this.setUserContextData();
    this.getAllJobPostsByUserId();
    this.GetPostFeedbackByUserID();
  }

  async setUserContextData(): Promise<void> {
    this.userContext = this.sharedDataService.getContext();
  }

  getAllJobPostsByUserId(): void {
    const userId = this.userContext.Id; // Set the user ID as needed
    this.jobFeedbackService.getJobPostsByUserId(userId).subscribe(
      (response) => {
        if (response.status === 200) {
          this.jobPosts = [];
          console.log('Job posts:', response);
          const formattedData = response.data.map((item:any) => ({
            id: item.j_Id,
            category: item.category,
            description: item.description,
            skills: item.skills,
            date: item.date,
            location: item.location,
            budget: item.budget,
            status: item.hiredLabour?.status,
            laborID:item.hiredLabour.id // Assuming status based on hiredLabour presence
          }));
  
          formattedData.forEach((item:any) => {
            this.jobPosts.push(item);
          });
          console.log('Job posts:', this.jobPosts);
          this.dataSourceJobManagement = new MatTableDataSource(this.jobPosts);
          this.dataSourceJobManagement.sort = this.sortJobPosts;
        } else {
          console.error('Error fetching job posts:');
          this.toastr.error('Error fetching job posts', 'Error');
        }
     
      },
      (error) => {
        console.error('Error fetching job posts:', error);
        this.toastr.error('Error fetching job posts', 'Error');
      }
    );
  }
  openFeedbackManageModal(element: any): void {
    if (element.status === 'CompletedRated') {
      // await API call and get feedbackData from hiredLabour id and set to feedbackData

      this.jobFeedbackService.GetPostFeedbackByHiredLaborID(element.laborID).subscribe(
        (response) => {
          if (response.status === 200) {
            this.feedbackData = response.data;
            this.openFeedbackModal(element, this.feedbackData);
            console.log('Feedback:', this.feedbackData);
          } else {
            console.error('Error fetching feedback:', response);
            this.toastr.error('Error fetching feedback', 'Error');
          }
        },
        (error) => {
          console.error('Error fetching feedback:', error);
          this.toastr.error('Error fetching feedback', 'Error');
        }
      
      )
    } else {
      this.feedbackManageModalRef = this.modalService.open(
        FeedbackManageModalComponent,
        {
          modalClass: 'modal-lg',
          data: { jobData: element, feedbackData: null },
        }
      );
      this.feedbackManageModalRef.onClose.subscribe((message: any) => {
        this.getAllJobPostsByUserId();
        console.log('closed');
      });
      
    }
  }

  openFeedbackModal(element: any, feedbackData: any = null): void {
    this.feedbackManageModalRef = this.modalService.open(
      FeedbackManageModalComponent,
      {
        modalClass: 'modal-lg',
        data: { jobData: element, feedbackData: feedbackData },
      }
    );
  
    this.feedbackManageModalRef.onClose.subscribe((message: any) => {
      this.getAllJobPostsByUserId();
      console.log('closed');
    });
  }

  GetPostFeedbackByUserID(): void {
    const userId = this.userContext.Id; // Set the user ID as needed
    this.jobFeedbackService.GetPostFeedbackByUserID(userId).subscribe(
      (response) => {
        if (response.status === 200) {
          this.feedbacks = response.data;
          const feedbackData = response.data.map((item:any) => ({
            id: item.r_Id,
            review: item.review,
            rating: item.rating,
            serviceType: item.serviceType
          }));
          this.feedbacks = feedbackData;
          this.dataSourceFeedbackManagement = new MatTableDataSource(this.feedbacks);
          this.dataSourceFeedbackManagement.sort = this.sortFeedbacks;
        } else {
          console.error('Error fetching feedbacks:', response);
          this.toastr.error('Error fetching feedbacks', 'Error');
        }
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
        this.toastr.error('Error fetching feedbacks', 'Error');
      }
    );
  }

  generateJobReport(): void {
    const userId = this.userContext.Id;
    this.jobFeedbackService.getJobPostReport(userId).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          console.log('Report:', response.data);
          const doc = new jsPDF();

          // Add Heading
          doc.setFontSize(36);
          doc.setFont('helvetica', 'italic');
          doc.setTextColor(233, 30, 99); // RGB equivalent of #e91e63
          doc.text('Task Masters', 50, 35); // Slightly adjusted 'y' position
          
          // Add Subheading
          doc.setFontSize(18);
          doc.setFont('times', 'Bold'); 
          doc.setTextColor(0); // Black for subheading
          doc.text('Job Post Report', 10, 45); // Approximate centering
          
          // Set up Sections
          doc.setFontSize(18);
          doc.setFont('times', 'normal'); 
          doc.setTextColor(0); // Black text
          
          // Add Job Details Section
          doc.setFont('times', 'bold');
          doc.text('Job Details', 10, 65); // Adjusted positioning
          doc.line(10, 70, 200, 70); 
          doc.setFontSize(14);
          doc.setFont('times', 'bold');
          doc.text('Total Job Post Count:', 10, 90);
          doc.setFont('times', 'normal');
          doc.text(response.data.totalJobPostCount.toString(), 80, 90);
          doc.setFont('times', 'bold');
          doc.text('Total Job Post Category Count:', 10, 80);
          doc.setFont('times', 'normal');
          doc.text(response.data.totalCategoryCount.toString(), 80, 80);
          
          // Add Category Count Section
          doc.setFontSize(20);
          doc.text('Category wise Details', 10, 105); // Adjusted positioning
          doc.line(10, 110, 200, 110);
          let yPos = 120;
          for (const category in response.data.categoryCount) {
              if (response.data.categoryCount.hasOwnProperty(category)) {
                  doc.setFontSize(14);
                  doc.setFont('times', 'bold');
                  doc.text(category + ':', 10, yPos);
                  doc.setFont('times', 'normal');
                  doc.text(response.data.categoryCount[category].toString(), 80, yPos);
                  yPos += 10;
              }
          }
          
          // Add State Count Section
          doc.setFontSize(18);
          doc.text('State Details', 10, yPos + 10); // Adjusted positioning
          doc.line(10, yPos + 15, 200, yPos + 15);
          yPos += 20;
          for (const state in response.data.stateCount) {
              if (response.data.stateCount.hasOwnProperty(state)) {
                  doc.setFontSize(14);
                  doc.setFont('times', 'bold');
                  doc.text(state + ':', 10, yPos);
                  doc.setFont('times', 'normal');
                  doc.text(response.data.stateCount[state].toString(), 80, yPos);
                  yPos += 10;
              }
          }
          
          // Save the PDF
          doc.save('job_post_report.pdf');
          

          
          this.toastr.success('Report generated successfully', 'Success');
        } else {
          this.toastr.error('Error generating report', 'Error');
        }
      },
      error: (error: any) => {
        console.error('Error generating report:', error);
        this.toastr.error('Error generating report', 'Error');
      },
    })

  }

  generateFeedbackReport(): void {
    const userId = this.userContext.Id;
    this.jobFeedbackService.GetFeedBackReport(userId).subscribe({
      next: (response: any) => {

        if (response.status === 200) {
        response = response.data;
        console.log("getFeedbackReport",response)
        const doc = new jsPDF();

        // Add Heading
        doc.setFontSize(36);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(233, 30, 99); // RGB equivalent of #e91e63
        doc.text('Task Masters', 50, 35); // Slightly adjusted 'y' position
        
        // Add Subheading
        doc.setFontSize(18);
        doc.setFont('times', 'Bold');
        doc.setTextColor(0); // Black for subheading
        doc.text('Feedback Report', 10, 45); // Approximate centering
        
        // Set up Sections
        doc.setFontSize(18);
        doc.setFont('times', 'normal');
        doc.setTextColor(0); // Black text
        
        // Add Feedback Details Section
        doc.setFont('times', 'bold');
        doc.text('Feedback Details', 10, 65); // Adjusted positioning
        doc.line(10, 70, 200, 70); // Horizontal line separator
        
        // Add Overall Summary
        doc.setFontSize(14);
        doc.setFont('times', 'bold');
        doc.text('Total Feedback Count:', 10, 80);
        doc.setFont('times', 'normal');
        doc.text(response.totalFeedbackCount.toString(), 80, 80);
        doc.setFont('times', 'bold');
        doc.text('Overall Average Rating:', 10, 90);
        doc.setFont('times', 'normal');
        doc.text(response.overallAvgRating.toString(), 80, 90);
        
        // Add Service Type Breakdown
        doc.setFont('times', 'bold');
        doc.text('Service Type Breakdown:', 10, 100); // Adjusted positioning
        doc.setFont('times', 'normal');
        let yPos = 110;
        response.serviceTypeCount.forEach((service: { [x: string]: any; }, index: string | number) => {
            const serviceType = Object.keys(service)[0];
            const jobCount = service[serviceType];
            const avgRating = response.serviceTypeAvgRating[index][serviceType];
            doc.text(`${serviceType}:`, 10, yPos);
            doc.text(`Total Jobs: ${jobCount}`, 80, yPos);
            doc.text(`Average Rating: ${avgRating}`, 120, yPos);
            yPos += 20;
        });
        doc.save('feedback_report.pdf');
        
        }
        else {
          console.error('Invalid response or missing data:', response);
          this.toastr.error('Invalid response or missing data', 'Error');
        }
      },
      error: (error: any) => {
        console.error('Error generating report:', error);
        this.toastr.error('Error generating report', 'Error');
      }

    });
  }
}