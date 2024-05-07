import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../../employee';
import { EmployeeService } from '../../../../employee.service';
import { Feedback } from '../../../../feedback';
import { FeedbackService } from '../../../../feedback-service.service';
 

// Import the EmpFeedback interface
export interface EmpFeedback {
  id: number;
  feedback: string;
}

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  id!: number;
  employee: Employee | undefined;
  feedbackList: Feedback[] = [];
  employeeId!: number;
  feedbackText!: string;
  feedbackMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private feedbackService: FeedbackService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] ?? 0;
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    });

    this.getFeedbackByEmployeeId();
  }
  
  getFeedbackByEmployeeId(): void {
    this.feedbackService.getFeedbackByEmployeeId(this.id).subscribe(
      feedback => {
        this.feedbackList = feedback;
      },
      error => {
        console.error('Error fetching feedback:', error);
      }
    );
  }

  submitFeedback(): void {
    const empFeedback: EmpFeedback = {
      id: this.employeeId,
      feedback: this.feedbackMessage
    };
  
    this.feedbackService.createFeedback(this.employeeId, this.feedbackMessage).subscribe(
      response => {
        console.log('Feedback submitted successfully:', response);
        // Reload the current route to refresh the page
        this.router.navigateByUrl('/employee-details', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/employee-details', this.employeeId]);
        });
      },
      error => {
        console.error('Error submitting feedback:', error);
      }
    );
  }
  
  
  
}
