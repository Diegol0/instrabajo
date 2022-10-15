import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Address } from 'src/app/app/api/address';
import { AddressService } from 'src/app/app/service/address.service';

declare var google: any;

@Component({
    templateUrl: './crud-address.component.html',
    providers: [MessageService],
})
export class CrudAddressComponent implements OnInit {
    addressDialog: boolean = false;

    deleteAddressDialog: boolean = false;

    center = { lat: 0, lng: 0 };

    deleteAddresssDialog: boolean = false;

    addresss: Address[] = [];

    address: Address = {};

    selectedAddresss: Address[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    cities: any[] = [];

    countries: any[] = [];

    options: any;

    overlays: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private addressService: AddressService,
        private messageService: MessageService
    ) {
       navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            
            this.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            this.options = {
                center: { lat: this.center.lat, lng: this.center.lng },
                zoom: 12,
            };
        });
    }

    ngOnInit() {
        this.addressService
            .getAddresss()
            .then((data) => (this.addresss = data));

        this.cols = [
            { field: 'name', header: 'Name' },

            { field: 'addressLine1', header: 'Line1' },
            { field: 'addressLine2', header: 'Line2' },
            { field: 'city', header: 'City' },
            { field: 'country', header: 'Country' },
        ];

        this.countries = [{ label: 'GUATEMALA', value: 'GT' }];
        this.cities = [
            { label: 'Alta Verapaz', value: 'GT-AV' },
            { label: 'Baja Verapaz', value: 'GT-BV' },
            { label: 'Chimaltenango', value: 'GT-CM' },
            { label: 'Chiquimula', value: 'GT-CQ' },
            { label: 'El Progreso', value: 'GT-PR' },
            { label: 'Escuintla', value: 'GT-ES' },
            { label: 'Departamento de Guatemala', value: 'GT-GU' },
            { label: 'Huehuetenango', value: 'GT-HU' },
            { label: 'Izabal', value: 'GT-IZ' },
            { label: 'Jalapa', value: 'GT-JA' },
            { label: 'Jutiapa', value: 'GT-JU' },
            { label: 'Petén', value: 'GT-PE' },
            { label: 'Quetzaltenango', value: 'GT-QZ' },
            { label: 'Quiché', value: 'GT-QC' },
            { label: 'Retalhuleu', value: 'GT-RE' },
            { label: 'Sacatepéquez', value: 'GT-SA' },
            { label: 'San Marcos', value: 'GT-SM' },
            { label: 'Santa Rosa', value: 'GT-SR' },
            { label: 'Sololá', value: 'GT-SO' },
            { label: 'Suchitepéques', value: 'GT-SU' },
            { label: 'Totonicapán', value: 'GT-TO' },
            { label: 'Zacapa', value: 'GT-ZA' },
        ];
    }

    openNew() {
        this.address = {};
        this.submitted = false;
        this.addressDialog = true;
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            
            this.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            this.options = {
                center: { lat: this.center.lat, lng: this.center.lng },
                zoom: 12,
            };
        });
        this.overlays = []
    }

    deleteSelectedAddresss() {
        this.deleteAddresssDialog = true;
    }

    editAddress(address: Address) {
        this.address = { ...address };
        this.addressDialog = true;
        this.center = { lat: this.address.lat!, lng: this.address.lng! };
        this.overlays = [
            new google.maps.Marker({position: this.center, title:this.address.name})
        ]
        this.options.center = this.center;
        this.options.zoom = 14;
    }

    deleteAddress(address: Address) {
        this.deleteAddressDialog = true;
        this.address = { ...address };
    }

    confirmDeleteSelected() {
        this.deleteAddresssDialog = false;
        this.addresss = this.addresss.filter(
            (val) => !this.selectedAddresss.includes(val)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Addresss Deleted',
            life: 3000,
        });
        this.selectedAddresss = [];
    }

    confirmDelete() {
        this.deleteAddressDialog = false;
        this.addresss = this.addresss.filter(
            (val) => val.id !== this.address.id
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Address Deleted',
            life: 3000,
        });
        this.address = {};
    }

    hideDialog() {
        this.addressDialog = false;
        this.submitted = false;
    }

    saveAddress() {
        if(this.center.lat==0){
            return;
        }
        this.submitted = true;
        
        this.address.lat = this.center.lat;

        this.address.lng = this.center.lng;

        console.log(this.overlays)
        
        if (this.address.name?.trim()) {
            if (this.address.id) {
                // @ts-ignore
                this.addresss[this.findIndexById(this.address.id)] =
                    this.address;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Address Updated',
                    life: 3000,
                });
            } else {
                this.address.id = this.createId();
                // @ts-ignore
                this.addresss.push(this.address);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Address Created',
                    life: 3000,
                });
            }

            this.addresss = [...this.addresss];
            this.addressDialog = false;
            this.address = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.addresss.length; i++) {
            if (this.addresss[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    addMarker(event: any){
        this.center = { lat: event.latLng.lat(), lng: event.latLng.lng() };;
        
        this.overlays = [
            new google.maps.Marker({position: event.latLng, title:this.address.name})
        ]

    }
}
