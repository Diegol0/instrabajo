import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../api/address';


@Injectable()
export class AddressService {
    constructor(private http: HttpClient) {}

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
            .then((res) => res.data as Address[])
            .then((data) => data);
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
}
