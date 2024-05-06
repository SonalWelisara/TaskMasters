import { Component, Input } from '@angular/core';
import { ClickEvent, HoverRatingChangeEvent, RatingChangeEvent } from 'angular-star-rating';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent {
  onClickResult!: ClickEvent;
  onHoverRatingChangeResult!: HoverRatingChangeEvent;
  onRatingChangeResult!: RatingChangeEvent;
  @Input() rating!: number;
  @Input() numOfStars!: number;
  @Input() readOnly!: boolean;

  onClick = ($event: ClickEvent) => {
    // console.log('onClick $event: ', $event);
    this.onClickResult = $event;
  };

  onRatingChange = ($event: RatingChangeEvent) => {
    // console.log('onRatingUpdated $event: ', $event);
    this.onRatingChangeResult = $event;
    this.rating = this.onRatingChangeResult.rating;
  };

  onHoverRatingChange = ($event: HoverRatingChangeEvent) => {
    // console.log('onHoverRatingChange $event: ', $event);
    this.onHoverRatingChangeResult = $event;
  };
}