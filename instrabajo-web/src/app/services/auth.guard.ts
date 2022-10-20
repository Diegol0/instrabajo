import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { InstrabajoService } from './instrabajo.service';
@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private instrabajoService: InstrabajoService
    ) {}

    canActivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.instrabajoService
            .verifyToken()
            .pipe(take(1))
            .pipe(
                map((data: any) => {
                    this.instrabajoService.setLoggedIn(true);
                    return data && data.isLogged;
                })
            );
    }
}
