import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private router: Router) {}

  handleError(error: Response | any): any {
    if (error.status === 401 || error.status === 403) {
      console.log();
      if (!this.router.url.includes('login')) {
        alert('Invalid session, redirecting to Login');
        this.router.navigate(['/auth/login']);
      } else {
        alert('Invalid credentials');
      }
    }
    return throwError(() => error.message);
  }
}
