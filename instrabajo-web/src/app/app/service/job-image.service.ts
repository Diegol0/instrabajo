import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { environment } from 'src/environments/environment';
import { JobImageDto } from '../models/service.dto';

@Injectable()
export class JobImageService {
    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService
    ) {}

    createJobImage(jobImage: JobImageDto) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return this.http
            .post<JobImageDto>(environment.instrabajoURL + 'job-images', jobImage, {
                headers: headers,
            })
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    getJobImages(jobId: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return this.http
            .get<any>(environment.instrabajoURL + `job-images/job/${jobId}`, {
                headers: headers,
            })
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    removeJobImage(jobImageId: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return this.http
            .delete<any>(environment.instrabajoURL + `job-images/${jobImageId}`, {
                headers: headers,
            })
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }
}
