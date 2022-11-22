import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { environment } from 'src/environments/environment';
import { Job } from '../api/job';
import { JobDto, JobUserDto } from '../models/service.dto';

@Injectable()
export class JobService {
    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService
    ) {}

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

    createJob(job: JobDto) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return this.http
            .post<JobDto>(environment.instrabajoURL + 'jobs', job, {
                headers: headers,
            })
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    updateJob(job: JobDto) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return this.http
            .patch<any>(environment.instrabajoURL + `jobs/${job._id}`, job, {
                headers: headers,
            })
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    getEmployerJobs(userId: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return this.http
            .get<any>(environment.instrabajoURL + `jobs/employer/${userId}`, {
                headers: headers,
            })
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    getEmployeeJobs(userId: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return this.http
            .get<any>(environment.instrabajoURL + `jobs/employee/${userId}`, {
                headers: headers,
            })
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    getJobsByStatus(status: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return this.http
            .get<any>(environment.instrabajoURL + `jobs/status/${status}`, {
                headers: headers,
            })
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    getJobById(id: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return this.http
            .get<any>(environment.instrabajoURL + `jobs/job/${id}`, {
                headers: headers,
            })
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    getApplyByJob(id: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return this.http
            .get<any>(environment.instrabajoURL + `jobs/apply/job/${id}`, {
                headers: headers,
            })
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    getApplyByUser(id: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return this.http
            .get<any>(environment.instrabajoURL + `jobs/apply/user/${id}`, {
                headers: headers,
            })
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    removeJob(jobId: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return this.http
            .delete<any>(environment.instrabajoURL + `jobs/${jobId}`, {
                headers: headers,
            })
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    createJobUser(jobUser: JobUserDto) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return this.http
            .post<JobDto>(environment.instrabajoURL + 'jobs/apply', jobUser, {
                headers: headers,
            })
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
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
