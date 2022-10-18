import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Review } from 'src/app/app/api/review';
import { ReviewService } from 'src/app/app/service/review.service';

@Component({
    templateUrl: './review.component.html',
    providers: [MessageService, ConfirmationService],
})
export class ReviewComponent implements OnInit {
    reviews: Review[] = [];

    constructor(private reviewService: ReviewService) {}

    ngOnInit() {
        this.reviewService.getReviews().then((data) => (this.reviews = data));
    }
}
