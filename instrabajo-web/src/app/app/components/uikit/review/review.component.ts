import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Review } from 'src/app/app/api/review';
import { ReviewService } from 'src/app/app/service/review.service';
import { InstrabajoService } from 'src/app/services/instrabajo.service';
import { map, switchMap, take } from 'rxjs';

@Component({
    templateUrl: './review.component.html',
    providers: [MessageService, ConfirmationService],
})
export class ReviewComponent implements OnInit {
    reviews: Review[] = [];
    user: any;

    constructor(private reviewService: ReviewService, private instrabajoService: InstrabajoService) {

        this.instrabajoService.getLoggedUser
            .pipe(take(1))
            .subscribe((user: any) => {
                this.user = user;
            });
    }

    ngOnInit() {
        this.reviewService.getReviews(this.user._id).pipe(take(1))
        .subscribe((data: any) => {
            this.reviews = data
        });
    }
}
