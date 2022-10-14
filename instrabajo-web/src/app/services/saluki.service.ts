import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserBreedDto,
  UserDto,
} from '../models/service.dto';
import { ErrorHandlerService } from './error-handler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class SalukiService {
  private readonly loggedIn = new BehaviorSubject<boolean>(false);
  private readonly loggedUser = new BehaviorSubject<any>(null);

  constructor(
    private readonly errorHandlerService: ErrorHandlerService,
    private http: HttpClient,
    private router: Router
  ) {}

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get getLoggedUser() {
    if (!this.loggedUser.value) {
      this.router.navigate(['login']);
    }
    return this.loggedUser.asObservable();
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  setLoggedUser(value: any) {
    this.loggedUser.next(value);
  }

  login(user: LoginUserDto) {
    return this.http
      .post<UserDto>(environment.salukiURL + 'auth/login', user)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleError(error)
        )
      );
  }

  signup(user: CreateUserDto) {
    return this.http
      .post<UserDto>(environment.salukiURL + 'users', user)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleError(error)
        )
      );
  }

  saveFavorite(user: UpdateUserBreedDto) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http
      .put<any>(environment.salukiURL + 'users', user, { headers: headers })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleError(error)
        )
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.setLoggedIn(false);
  }

  verifyToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http
      .get(environment.salukiURL + 'auth/verifyToken', { headers: headers })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleError(error)
        )
      );
  }
}
