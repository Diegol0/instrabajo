import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '../api/job';


@Injectable()
export class JobService {
    constructor(private http: HttpClient) {}

    getJobsSmall() {
        return this.http
            .get<any>('assets/app/data/products-small.json')
            .toPromise()
            .then((res) => res.data as Job[])
            .then((data) => data);
    }

    getJobs() {
        return this.http
            .get<any>('assets/app/data/jobs.json')
            .toPromise()
            .then((res) => res.data as Job[])
            .then((data) => data);
    }

    getJobsMixed() {
        return this.http
            .get<any>('assets/app/data/jobs-mixed.json')
            .toPromise()
            .then((res) => res.data as Job[])
            .then((data) => data);
    }

    getJobsWithOrdersSmall() {
        return this.http
            .get<any>('assets/app/data/products-orders-small.json')
            .toPromise()
            .then((res) => res.data as Job[])
            .then((data) => data);
    }
}
