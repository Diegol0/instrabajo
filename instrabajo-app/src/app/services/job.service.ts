import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JobDto } from '../models/service.dto';
import { ErrorHandlerService } from './error-handler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  listAll() {
    return this.http
      .get<any>(environment.salukiURL + 'jobs/')
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleError(error)
        )
      );
  }

  listSubJob(job: string) {
    return this.http
      .get<any>(environment.salukiURL + `job/${job}/list`)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleError(error)
        )
      );
  }

  getAllJobImage(job: string) {
    return this.http
      .get<any>(environment.salukiURL + `job/${job}/images`)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleError(error)
        )
      );
  }

  getSingleJobImage(job: string) {
    return this.http
      .get<any>(environment.salukiURL + `job/${job}/images/random`)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleError(error)
        )
      );
  }

  getSubJobImage(job: string, subJob: string) {
    return this.http
      .get<any>(environment.salukiURL + `job/${job}/${subJob}/images/random`)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleError(error)
        )
      );
  }
  getJobImage(job: string) {
    return this.http
      .get<any>(environment.salukiURL + `job/${job}/images/random`)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleError(error)
        )
      );
  }

  createJob(job: JobDto) {
    return this.http
      .post<JobDto>(environment.salukiURL + 'jobs', job)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleError(error)
        )
      );
  }


}
