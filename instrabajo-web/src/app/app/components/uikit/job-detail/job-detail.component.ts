import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MessageService, SelectItem } from 'primeng/api';
import { MessagesService } from 'src/app/app/service/message.service';
import { interval, map, Subscription, switchMap, take } from 'rxjs';
import { Address } from 'src/app/app/api/address';
import { Review } from 'src/app/app/api/review';
import { Job } from 'src/app/app/api/job';
import {
    CompareDto,
    GalleryImage,
    JobImageDto,
    UpdateUserDto,
} from 'src/app/app/models/service.dto';
import { AddressService } from 'src/app/app/service/address.service';
import { CountryService } from 'src/app/app/service/country.service';
import { JobImageService } from 'src/app/app/service/job-image.service';
import { JobService } from 'src/app/app/service/job.service';
import { InstrabajoService } from 'src/app/services/instrabajo.service';
import { ReviewService } from 'src/app/app/service/review.service';
import { Message } from 'src/app/app/api/message';
declare var google: any;

@Component({
    templateUrl: './job-detail.component.html',
    providers: [MessageService],
    styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
    countries: any[] = [];
    messages: Message[] = [];
    mess: Message = {};
    user: any = {};
    review: Review = {};
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
    acceptEmployeeDialog: boolean = false;
    photo = null;

    faceMatch = false;

    id = '';

    jobImages: any[] = [];

    employer: any = {};
    employee: any = {};

    subscription: Subscription;

    galleriaResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5,
        },
        {
            breakpoint: '960px',
            numVisible: 4,
        },
        {
            breakpoint: '768px',
            numVisible: 3,
        },
        {
            breakpoint: '560px',
            numVisible: 1,
        },
    ];

    constructor(
        private countryService: CountryService,
        public instrabajoService: InstrabajoService,
        private messageService: MessageService,
        private jobService: JobService,
        private addressService: AddressService,
        private route: ActivatedRoute,
        private messagesService: MessagesService,
        private jobImagesService: JobImageService,
        private reviewService: ReviewService
    ) {
        this.options = {
            center: { lat: this.center.lat, lng: this.center.lng },
            zoom: 12,
        };

        const source = interval(2000);
        const text = 'Your Text Here';
        this.subscription = source.subscribe((val) => {
            if (this.job._id) {
                this.messagesService
                    .getAllMessages(this.job._id)
                    .pipe(take(1))
                    .subscribe((data: any) => {
                        this.messages = data;
                    });
            }
        });
    }

    async ngOnInit() {
        await this.instrabajoService.getLoggedUser
            .pipe(take(1))
            .subscribe((user: any) => {
                this.user = user;
                console.log(user);
            });

        this.id = await this.route.snapshot.paramMap.get('id')!;

        await this.loadJob();

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

    loadJob() {
        this.jobService
            .getJobById(this.id)
            .pipe(take(1))
            .subscribe((job: any) => {
                this.job = job;
                this.messagesService
                .getAllMessages(job._id)
                .pipe(take(1))
                .subscribe((data: any) => {
                    this.messages = data;
                });
                this.messagesService.updateReadMessages(job._id,this.user._id).pipe(take(1))
                    .subscribe((data: any) => {
                
                });
                this.loadImages();
                if (job.employee) {
                    this.instrabajoService
                        .getUser(job.employee!)
                        .pipe(take(1))
                        .subscribe((user: any) => {
                            this.employee = user;
                        });
                }

                if (job.employer) {
                    this.instrabajoService
                        .getUser(job.employer!)
                        .pipe(take(1))
                        .subscribe((user: any) => {
                            this.employer = user;
                        });
                }
                this.addressService
                    .getAddressById(this.job.address!)
                    .pipe(take(1))
                    .subscribe((data: any) => {
                        console.log(data);
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

    sendMessage() {
        this.mess.jobId = this.job._id;
        this.mess.fromUserId = this.user._id;
        this.mess.toUserId =
            this.user._id == this.job.employer
                ? this.job.employee
                : this.job.employer;
        this.mess.read = false;
        this.messagesService
            .createMessage(this.mess)
            .pipe(take(1))
            .subscribe((data: any) => {
                if (data) {
                    console.log('_id: ' + data._id);
                }
                this.loadJob();
            });
    }
    loadImages() {
        this.jobImages = [];
        this.jobImagesService
            .getJobImages(this.job._id)
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

    acceptEmployee() {
        this.acceptEmployeeDialog = true;
    }

    confirmEmployee() {
        this.acceptEmployeeDialog = false;
        this.job.status = 'ACCEPTED';
        this.jobService
            .updateJob(this.job)
            .pipe(take(1))
            .subscribe((job: any) => {
                this.loadJob();
            });
    }

    completeJob() {
        this.completeJobDialog = true;
    }

    confirmCompleteJob() {
        this.completeJobDialog = false;
        this.job.status = 'COMPLETED';
        this.jobService
            .updateJob(this.job)
            .pipe(take(1))
            .subscribe((job: any) => {
                this.loadJob();
            });
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

    createReview() {
        this.review.nameJob = this.job.name;
        this.review.userId =
            this.user._id == this.job.employer
                ? this.job.employee
                : this.job.employer;
        this.reviewService
            .createReview(this.review)
            .pipe(take(1))
            .subscribe((data: any) => {
                if (data) {
                    console.log('_id: ' + data._id);
                }
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Thank you for your review',
                    life: 3000,
                });
            });
    }

    compare() {
        let compare: CompareDto = {
            source: this.employee.photo,
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
                    this.faceMatch = true;
                } else {
                    alert('No, this is not the employee! Be careful!!!!');
                    this.faceMatch = false;
                }

                this.messageService.add({
                    severity: 'info',
                    summary: 'Success',
                    detail: 'User updated',
                });
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
