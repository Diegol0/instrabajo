import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { SalukiService } from './saluki.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private salukiService: SalukiService) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.salukiService
      .verifyToken()
      .pipe(take(1))
      .pipe(
        map((data: any) => {
          this.salukiService.setLoggedIn(true);
          return data && data.isLogged;
        })
      );
  }
}
