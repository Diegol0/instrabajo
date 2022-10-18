import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MessageService, SelectItem } from 'primeng/api';
import { map, switchMap } from 'rxjs';
import { Address } from 'src/app/app/api/address';
import { Job } from 'src/app/app/api/job';
import { AddressService } from 'src/app/app/service/address.service';
import { CountryService } from 'src/app/app/service/country.service';
import { JobService } from 'src/app/app/service/job.service';
declare var google: any;

@Component({
    templateUrl: './job-detail.component.html',
    providers: [MessageService],
})
export class JobDetailComponent implements OnInit {
    countries: any[] = [];

    filteredCountries: any[] = [];

    selectedCountryAdvanced: any[] = [];

    options: any;

    overlays: any[] = [];

    center = { lat: 0, lng: 0 };

    job: Job = {};

    jobs: Job[] = [];

    addresss: Job[] = [];
    
    address: Address = {};

    valSlider = 50;

    valColor = '#424242';

    valRadio: string = '';

    valCheck: string[] = [];

    rateTypes: any[] = [];

    skills: any[] = [];

    valCheck2: boolean = false;

    valSwitch: boolean = false;

    cities: SelectItem[] = [];

    selectedList: SelectItem = { value: '' };

    selectedDrop: SelectItem = { value: '' };

    selectedMulti: any[] = [];

    valToggle = false;

    paymentOptions: any[] = [];

    valSelect1: string = "";

    valSelect2: string = "";

    valueKnob = 20;

    cancelJobDialog: boolean = false;

    completeJobDialog: boolean = false;

    constructor(private countryService: CountryService,
        private messageService: MessageService, private jobService: JobService, private addressService: AddressService, private route: ActivatedRoute) {
        this.options = {
            center: { lat: this.center.lat, lng: this.center.lng },
            zoom: 12,
        };
     }

    ngOnInit() {

        const id = this.route.snapshot.paramMap.get('id')!;

              this.jobService.getJobs().then((data) => {
                    (this.jobs = data)
                    this.job = this.jobs.filter(job => job.id = id)[0];
                    this.addressService
                    .getAddresss()
                    .then((data) => {(this.addresss = data)
                        this.address = this.addresss.filter(address => address.id = this.job.address)[0];
                        
                        
                        this.center = { lat: this.address.lat!, lng: this.address.lng! };
                        this.overlays = [
                            new google.maps.Marker({position: this.center, title:this.address.name})
                        ]
                        this.options.center = this.center;
                        this.options.zoom = 14;});

                });
              


        this.skills = [
            { label: 'ELECTRONIC', value: 'ELECTRONIC' },
            { label: 'GAMER', value: 'GAMER' },
            { label: 'TRAINER', value: 'TRAINER' },
            { label: 'MECHANIC', value: 'MECHANIC' },
            { label: 'CARPENTER', value: 'CARPENTER' },
            { label: 'CLEARNER', value: 'CLEARNER' },
            { label: 'GARDENER', value: 'GARDENER' },
            { label: 'BABYSITTER', value: 'BABYSITTER' },
        ];

        this.rateTypes = [
            { label: 'Hourly Rate', value: 'HOURLY' },
            { label: 'Fixed Rate', value: 'FIXED' },
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

        this.paymentOptions = [
            { name: 'Option 1', value: 1 },
            { name: 'Option 2', value: 2 },
            { name: 'Option 3', value: 3 }
        ];
    }

    filterCountry(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }

    cancelJob(){
        this.cancelJobDialog = true;
    }

    completeJob(){
        this.completeJobDialog = true;
    }

    confirm() {
        this.completeJobDialog = false;
        this.cancelJobDialog = false;
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Job Status Changed',
            life: 3000,
        });
    }
}
