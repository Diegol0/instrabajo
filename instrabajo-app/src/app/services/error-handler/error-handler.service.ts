import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AlertService } from 'src/app/alert.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private router: Router, private alertService: AlertService) {}

  handleError(error: Response | any): any {
    if (error.status === 401 || error.status === 403) {
      console.log();
      if (!this.router.url.includes('login')) {
        this.alertService.showAlert('Invalid session, redirecting to Login');
        this.router.navigate(['login']);
      } else {
        this.alertService.showAlert('Invalid credentials');
      }
    }
    return throwError(() => error.message);
  }
}
