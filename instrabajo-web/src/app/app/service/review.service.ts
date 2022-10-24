import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../api/review';
import { environment } from 'src/environments/environment';

@Injectable()
export class ReviewService {
    constructor(private http: HttpClient) {}

    getReviewsSmall() {
        return this.http
            .get<any>('assets/app/data/products-small.json')
            .toPromise()
            .then((res) => res.data as Review[])
            .then((data) => data);
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
