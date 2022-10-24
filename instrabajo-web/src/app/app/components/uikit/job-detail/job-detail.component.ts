import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MessageService, SelectItem } from 'primeng/api';
import { map, switchMap, take } from 'rxjs';
import { Address } from 'src/app/app/api/address';
import { Job } from 'src/app/app/api/job';
import { CompareDto, GalleryImage, JobImageDto, UpdateUserDto } from 'src/app/app/models/service.dto';
import { AddressService } from 'src/app/app/service/address.service';
import { CountryService } from 'src/app/app/service/country.service';
import { JobImageService } from 'src/app/app/service/job-image.service';
import { JobService } from 'src/app/app/service/job.service';
import { InstrabajoService } from 'src/app/services/instrabajo.service';
declare var google: any;

@Component({
    templateUrl: './job-detail.component.html',
    providers: [MessageService],
})
export class JobDetailComponent implements OnInit {
    countries: any[] = [];
    user: any = {};
    filteredCountries: any[] = [];
    selectedCountryAdvanced: any[] = [];
    options: any;
    overlays: any[] = [];
    center = { lat: 0, lng: 0 };
    job: Job = {};
    jobs: Job[] = [];
    addresss: Address[] = [];
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
    valSelect1: string = '';
    valSelect2: string = '';
    valueKnob = 20;
    cancelJobDialog: boolean = false;
    completeJobDialog: boolean = false;
    photo = null;

    faceMatch = false;

    jobImages: any[] = [];

    galleriaResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    constructor(
        private countryService: CountryService,
        public instrabajoService: InstrabajoService,
        private messageService: MessageService,
        private jobService: JobService,
        private addressService: AddressService,
        private route: ActivatedRoute,
        private jobImagesService: JobImageService
    ) {
        this.options = {
            center: { lat: this.center.lat, lng: this.center.lng },
            zoom: 12,
        };
    }

    async ngOnInit() {
        await this.instrabajoService.getLoggedUser
            .pipe(take(1))
            .subscribe((user: any) => {
                this.user = user;
                console.log(user);
            });

        const id = this.route.snapshot.paramMap.get('id')!;

        this.jobService
            .getJobById(id)
            .pipe(take(1))
            .subscribe((job: any) => {
                this.job = job;
                this.loadImages();
                this.addressService
                    .getAddressById(this.job.address!)
                    .pipe(take(1))
                    .subscribe((data: any) => {
                        console.log(data)
                        this.address = data;
                        this.center = {
                            lat: +this.address.lat!,
                            lng: +this.address.lng!,
                        };
                        this.overlays = [
                            new google.maps.Marker({
                                position: this.center,
                                title: this.address.name,
                            }),
                        ];
                        this.options.center = this.center;
                        this.options.zoom = 14;
                    });
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
            { name: 'Option 3', value: 3 },
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

    loadImages(){

        this.jobImages = [];
        this.jobImagesService.getJobImages(this.job._id)
        .pipe(take(1))
        .subscribe((data: JobImageDto[]) => {
            data.forEach((jobImage: JobImageDto) => {
                let image: GalleryImage = {};
                image.itemImageSrc = jobImage.imageKey;
                image.thumbnailImageSrc = jobImage.imageKey;
                image.alt = 'alt';
                image.title = 'Job Image';
                this.jobImages.push(image);
            });
        });
    }

    cancelJob() {
        this.cancelJobDialog = true;
    }

    completeJob() {
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

    onBasicUpload(event: any) {
        this.instrabajoService
            .saveUserPhoto(event.files[0])
            .pipe(take(1))
            .subscribe((data: any) => {
                console.log(data);
                this.photo = data.payload.url;
                this.compare();
            });
    }

    compare() {
        let compare: CompareDto = {
            source: this.user.photo,
            target: this.photo!,
        };

        this.instrabajoService
            .compare(compare)
            .pipe(take(1))
            .subscribe((data: any) => {
                console.log(data);
                if (
                    data.payload.FaceMatches &&
                    data.payload.FaceMatches.length > 0
                ) {
                    alert('Faces match!!!!');
                    alert(JSON.stringify(data.payload.FaceMatches));
                    this.faceMatch = true;
                } else {
                    alert('No, this is not the employee!');
                    this.faceMatch = false;
                }

                this.messageService.add({
                    severity: 'info',
                    summary: 'Success',
                    detail: 'User updated',
                });
            });
    }
}
