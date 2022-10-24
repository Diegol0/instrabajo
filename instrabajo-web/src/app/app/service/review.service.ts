import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../api/review';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDto, ReviewDto } from 'src/app/app/models/service.dto';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';


@Injectable()
export class ReviewService {
    constructor(private http: HttpClient, private errorHandlerService:ErrorHandlerService) {}

    getReviewsSmall() {
        return this.http
            .get<any>('assets/app/data/products-small.json')
            .toPromise()
            .then((res) => res.data as Review[])
            .then((data) => data);
    }
    createReview(review: Review) {
        return this.http
            .post<ReviewDto>(environment.instrabajoURL + 'review', review)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    getReviews(userId: string) {
        return this.http
        .get<any>(environment.instrabajoURL + 'review/'+userId);
    }
        /*return this.http
            .get<any>('assets/app/data/reviews.json')
            .toPromise()
            .then((res) => res.data as Review[])
            .then((data) => data);*/

            

    getReviewsMixed() {
        return this.http
            .get<any>('assets/app/data/addresses-mixed.json')
            .toPromise()
            .then((res) => res.data as Review[])
            .then((data) => data);
    }

    getReviewsWithOrdersSmall() {
        return this.http
            .get<any>('assets/app/data/products-orders-small.json')
            .toPromise()
            .then((res) => res.data as Review[])
            .then((data) => data);
    }
}
