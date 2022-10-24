import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { take } from 'rxjs';
import { Job } from 'src/app/app/api/job';
import { GalleryImage, JobDto, JobImageDto } from 'src/app/app/models/service.dto';
import { AddressService } from 'src/app/app/service/address.service';
import { JobImageService } from 'src/app/app/service/job-image.service';
import { JobService } from 'src/app/app/service/job.service';
import { InstrabajoService } from 'src/app/services/instrabajo.service';

declare var google: any;

@Component({
    templateUrl: './crud-job.component.html',
    providers: [MessageService],
})
export class CrudJobComponent implements OnInit {
    jobDialog: boolean = false;

    deleteJobDialog: boolean = false;

    center = { lat: 0, lng: 0 };

    deleteJobsDialog: boolean = false;

    jobs: Job[] = [];

    addresss: Job[] = [];

    job: JobDto = {};

    selectedJobs: Job[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rateTypes: any[] = [];

    skills: any[] = [];

    options: any;

    overlays: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    user: any;

    jobImages: any[] = [];

    galleryImage: GalleryImage[] = [];

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
        private jobService: JobService,
        private messageService: MessageService,
        private addressService: AddressService,
        private route: ActivatedRoute,
        private jobImagesService: JobImageService,
        private router: Router,
        private instrabajoService: InstrabajoService
    ) {
        this.instrabajoService.getLoggedUser
            .pipe(take(1))
            .subscribe((user: any) => {
                this.user = user;
            });
    }

    loadJobs(){
        this.jobService
            .getEmployerJobs(this.user._id)
            .pipe(take(1))
            .subscribe((data: any) => {
                this.jobs = data
                console.log(data);
            });
    }

    ngOnInit() {
        // this.jobService.getJobs().then((data) => (this.jobs = data));

        this.loadJobs();

        this.addressService
            .getAddressByUser(this.user._id)
            .subscribe((data: any) => {
                this.addresss = data
            });

            /*this.addressService
            .getAddresss()
            .then((data) => (this.addresss = data));*/
            
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' },
            { field: 'skill', header: 'Skill' },
            { field: 'rateType', header: 'Rate Type' },
            { field: 'hourlyRate', header: 'Hourly Rate' },
            { field: 'fixedRate', header: 'Fixed Rate' },
        ];

        this.skills = [
            { label: 'ELECTRONIC', value: 'ELECTRONIC' },
            { label: 'GAMER', value: 'GAMER' },
            { label: 'TRAINER', value: 'TRAINER' },
            { label: 'MECHANIC', value: 'MECHANIC' },
            { label: 'CARPENTER', value: 'CARPENTER' },
            { label: 'CLEARNER', value: 'CLEARNER' },
            { label: 'GARDENER', value: 'GARDENER' },
            { label: 'BABYSITTER', value: 'BABYSITTER' },
            { label: 'WAITER', value: 'WAITER' },
            { label: 'PLUMBER', value: 'PLUMBER' },
            { label: 'BLACKSMITH', value: 'BLACKSMITH' },
        ];
        this.rateTypes = [
            { label: 'Hourly Rate', value: 'HOURLY' },
            { label: 'Fixed Rate', value: 'FIXED' },
        ];
    }

    openNew() {
        this.job = {};
        this.job.status = 'NEW';
        this.submitted = false;
        this.jobDialog = true;
    }

    deleteSelectedJobs() {
        this.deleteJobsDialog = true;
    }

    editJob(job: JobDto) {
        this.job = { ...job };
        this.loadImages();
        this.jobDialog = true;
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
    

    deleteJob(job: JobDto) {
        this.deleteJobDialog = true;
        this.job = { ...job };
    }

    confirmDeleteSelected() {
        this.deleteJobsDialog = false;
        this.jobs = this.jobs.filter((val) => !this.selectedJobs.includes(val));
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Jobs Deleted',
            life: 3000,
        });
        this.selectedJobs = [];
    }

    confirmDelete() {
        this.deleteJobDialog = false;

        console.log(this.job._id)

        this.jobService
        .removeJob(this.job._id)
        .pipe(take(1))
        .subscribe((data: any) => {
            console.log(data)
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Job Deleted',
                life: 3000,
            });
            this.loadJobs();
        });
        this.job = {};
    }

    onBasicUpload(event: any) {
        this.instrabajoService
            .saveUserPhoto(event.files[0])
            .pipe(take(1))
            .subscribe((data: any) => {
                console.log(data);
                let jobImage: JobImageDto = {};
                jobImage.imageKey = data.payload.url;
                jobImage.jobId = this.job._id;
                let image: GalleryImage = {};
                image.itemImageSrc = data.payload.url;
                image.thumbnailImageSrc = data.payload.url;
                image.alt = 'alt';
                image.title = 'Job Image';
                this.galleryImage.push(image);
                this.jobImagesService.createJobImage(jobImage)
                .pipe(take(1))
                .subscribe((data: any) => {
                    console.log(data)
                    this.loadImages();
                });
            });
    }

    hideDialog() {
        this.jobDialog = false;
        this.submitted = false;
    }

    saveJob() {
        this.submitted = true;

        console.log(this.overlays);
        if (this.job.rateType == 'FIXED') {
            this.job.hourlyRate = undefined;
        } else {
            this.job.fixedRate = undefined;
        }

        if (this.job.name?.trim()) {
            if (this.job._id) {
                // update job
                // @ts-ignore
                this.jobService
                    .updateJob(this.job)
                    .pipe(take(1))
                    .subscribe((data: any) => {
                        console.log(data)
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Job Updated',
                            life: 3000,
                        });
                        this.loadJobs();
                    });
            } else {
                // create job
                // @ts-ignore
                this.job.status = 'AVAILABLE'
                this.job.employer = this.user._id;
                this.jobService
                    .createJob(this.job)
                    .pipe(take(1))
                    .subscribe((data: any) => {
                        console.log(data)
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Job Created',
                            life: 3000,
                        });
                        this.loadJobs();
                    });
            }

            this.jobs = [...this.jobs];
            this.jobDialog = false;
            this.job = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.jobs.length; i++) {
            if (this.jobs[i]._id === id) {
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

    addMarker(event: any) {
        this.center = { lat: event.latLng.lat(), lng: event.latLng.lng() };

        this.overlays = [
            new google.maps.Marker({
                position: event.latLng,
                title: this.job.name,
            }),
        ];
    }

    viewJob(job: Job) {
        this.router.navigate(['/uikit/job-detail', { id: job._id }]);
    }
}
