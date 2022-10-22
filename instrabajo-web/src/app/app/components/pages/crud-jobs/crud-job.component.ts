import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { take } from 'rxjs';
import { Job } from 'src/app/app/api/job';
import { AddressService } from 'src/app/app/service/address.service';
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

    job: Job = {};

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

    constructor(
        private jobService: JobService,
        private messageService: MessageService,
        private addressService: AddressService,
        private route: ActivatedRoute,
        private router: Router,
        private instrabajoService: InstrabajoService
    ) {
        this.instrabajoService.getLoggedUser
            .pipe(take(1))
            .subscribe((user: any) => {
                this.user = user;
            });
    }

    ngOnInit() {
        this.jobService.getJobs().then((data) => (this.jobs = data));

        this.jobService.getUserJobs(this.user._id)
            .pipe(take(1))
            .subscribe((data: any) => {
                console.log(data)
            });

            this.addressService
                .getAddressByUser(this.user._id)
                .then((data) => (this.addresss = data));
                
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

    editJob(job: Job) {
        this.job = { ...job };
        this.jobDialog = true;
    }

    deleteJob(job: Job) {
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
        this.jobs = this.jobs.filter((val) => val.id !== this.job.id);
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Job Deleted',
            life: 3000,
        });
        this.job = {};
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
            if (this.job.id) {
                // @ts-ignore
                this.jobs[this.findIndexById(this.job.id)] = this.job;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Job Updated',
                    life: 3000,
                });
            } else {
                this.job.id = this.createId();
                // @ts-ignore
                this.jobs.push(this.job);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Job Created',
                    life: 3000,
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
            if (this.jobs[i].id === id) {
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

    uploadedFiles: any[] = [];

    onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded',
        });
    }

    onBasicUpload() {
        this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded with Basic Mode',
        });
    }

    viewJob(job: Job) {
        this.router.navigate(['/uikit/job-detail', { id: job.id }]);
    }
}
