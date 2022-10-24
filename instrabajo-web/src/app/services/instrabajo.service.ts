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
    CompareDto,
    CreateUserDto,
    JobDto,
    LoginUserDto,
    UpdateUserDto,
    UserDto,
} from '../app/models/service.dto';

import { ErrorHandlerService } from './error-handler/error-handler.service';

@Injectable({
    providedIn: 'root',
})
export class InstrabajoService {
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
        console.log(this.loggedUser.value);
        if (!this.loggedUser.value) {
            this.router.navigate(['/auth/login']);
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
            .post<UserDto>(environment.instrabajoURL + 'auth/login', user)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    signup(user: CreateUserDto) {
        return this.http
            .post<UserDto>(environment.instrabajoURL + 'users', user)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    updateUser(user: UpdateUserDto) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return this.http
            .put<any>(environment.instrabajoURL + 'users', user, {
                headers: headers,
            })
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    getUser(id: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return this.http
            .get<any>(environment.instrabajoURL + `users/${id}`, {
                headers: headers,
            })
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    compare(compare: CompareDto) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return this.http
            .post<any>(
                environment.instrabajoURL + 'file-upload/compare',
                compare,
                {
                    headers: headers,
                }
            )
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    saveUserPhoto(file: File) {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: `application/json, text/plain, */*`,
        });
        const formData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<any>(
            environment.instrabajoURL + 'file-upload/upload',
            formData,
            {
                headers: headers,
            }
        );
    }

    logout() {
        localStorage.removeItem('token');
        this.setLoggedIn(false);
        this.router.navigate(['/auth/login']);
    }

    verifyToken() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        if (this.loggedUser.value == null) {
            this.logout();
            return this.http
                .get(environment.instrabajoURL + 'error', { headers: headers })
                .pipe(
                    catchError((error: HttpErrorResponse) =>
                        this.errorHandlerService.handleError(error)
                    )
                );
        }
        return this.http
            .get(environment.instrabajoURL + 'auth/verifyToken', {
                headers: headers,
            })
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }
}
