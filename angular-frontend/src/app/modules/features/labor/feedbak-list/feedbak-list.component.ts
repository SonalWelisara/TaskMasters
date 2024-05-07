import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../../../feedback';
import { FeedbackService } from '../../../../feedback-service.service';
 

@Component({
  selector: 'app-feedbak-list',
  templateUrl: './feedbak-list.component.html',
  styleUrls: ['./feedbak-list.component.scss']
})
export class FeedbackListComponent implements OnInit {

  feedbacks!: Feedback[];

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.fetchFeedbacks();
  }
  deleteFeedback(feedbackId: number) {
    this.feedbackService.deleteFeedback(feedbackId).subscribe(
      () => {
        // After successful deletion, update the feedbacks array
        this.feedbacks = this.feedbacks.filter(feedback => feedback.fid !== feedbackId);
      },
      (error) => {
        console.error('Error deleting feedback:', error);
      }
    );
  }
  fetchFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe(
      feedbacks => {
        this.feedbacks = feedbacks;
      },
      error => {
        console.error('Error fetching feedbacks: ', error);
      }
    );
  }
}
