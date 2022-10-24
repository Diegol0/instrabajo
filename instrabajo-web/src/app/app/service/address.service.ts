import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { Address } from '../api/address';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

import {
    UserDto,
    AddressDto,
} from 'src/app/app/models/service.dto';

@Injectable({
    providedIn: 'root',
})
export class AddressService {
    constructor(
        private readonly errorHandlerService: ErrorHandlerService,
        private http: HttpClient,
        private router: Router) {}

    getAddresssSmall() {
        return this.http
            .get<any>('assets/app/data/products-small.json')
            .toPromise()
            .then((res) => res.data as Address[])
            .then((data) => data);
    }

    getAddresss() {
        
        return this.http
            .get<any>('assets/app/data/addresses.json')
            .toPromise()
            .then((res) => res as Address[])
            .then((data) => data);
    }

    getAddressByUser(userId: string) {
        return this.http
        .get<any>(environment.instrabajoURL + 'address/'+userId);
    }

    getAddresssMixed() {
        return this.http
            .get<any>('assets/app/data/addresses-mixed.json')
            .toPromise()
            .then((res) => res.data as Address[])
            .then((data) => data);
    }

    getAddresssWithOrdersSmall() {
        return this.http
            .get<any>('assets/app/data/products-orders-small.json')
            .toPromise()
            .then((res) => res.data as Address[])
            .then((data) => data);
    }

    createAdress(address: Address) {
        return this.http
            .post<AddressDto>(environment.instrabajoURL + 'address', address)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    updateAdress(address: Address) {
        return this.http
            .patch<AddressDto>(environment.instrabajoURL + 'address', address)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    deleteAddress(address: Address) {
        console.log("ADDRESS ID: "+address._id);
            return this.http
                .delete<any>(environment.instrabajoURL + 'address/'+address._id)
                .pipe(
                    catchError((error: HttpErrorResponse) =>
                        this.errorHandlerService.handleError(error)
                    )
                );
        }
    }

