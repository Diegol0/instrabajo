import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { take } from 'rxjs';
import { Job } from 'src/app/app/api/job';
import { JobUserDto } from 'src/app/app/models/service.dto';
import { AddressService } from 'src/app/app/service/address.service';
import { JobImageService } from 'src/app/app/service/job-image.service';
import { JobService } from 'src/app/app/service/job.service';
import { UtilsService } from 'src/app/app/service/utils.service';
import { InstrabajoService } from 'src/app/services/instrabajo.service';

@Component({
    templateUrl: './job-list.component.html',
    providers: [MessageService],
})
export class JobListComponent implements OnInit {
    jobs: Job[] = [];

    applyJobDialog: boolean = false;

    job: Job = {};

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    user: any;

    availableJobs: Job[] = [];

    employeeJobs: Job[] = [];

    filteredJobs: Job[] = [];

    userLocation = { lat: 0, lng: 0 };

    constructor(
        private jobService: JobService,
        private messageService: MessageService,
        public utilsService: UtilsService,
        private router: Router,
        private jobImagesService: JobImageService,
        private addressService: AddressService,
        private instrabajoService: InstrabajoService
    ) {
        this.instrabajoService.getLoggedUser
            .pipe(take(1))
            .subscribe((user: any) => {
                this.user = user;
            });
    }

    async ngOnInit() {
        this.loadJobs();

        this.sortOptions = [
            { label: 'Disponibles', value: 'ALL' },
            { label: 'Mis trabajos', value: 'MY' },
            { label: 'Cerca de mi', value: 'NEAR' },
            { label: 'Con mi habilidad', value: 'SKILLS' },
        ];
    }

    async loadJobs() {
        await this.jobService
            .getJobsByStatus('AVAILABLE')
            .pipe(take(1))
            .subscribe((jobs: any) => {
                jobs.forEach((job: Job) => {
                    this.addressService
                        .getAddressById(job.address!)
                        .pipe(take(1))
                        .subscribe((address: any) => {
                            job.address = address;
                        });
                    this.jobImagesService
                        .getJobImages(job._id)
                        .pipe(take(1))
                        .subscribe((images: any) => {
                            job.images = images;
                        });
                });
                this.availableJobs = jobs;
                this.filteredJobs = jobs;
            });

        await this.jobService
            .getEmployeeJobs(this.user._id)
            .pipe(take(1))
            .subscribe((jobs: any) => {
                jobs.forEach((job: Job) => {
                    this.jobImagesService
                        .getJobImages(job._id)
                        .pipe(take(1))
                        .subscribe((images: any) => {
                            job.images = images;
                        });
                });
                this.employeeJobs = jobs;
            });
    }

    async onSortChange(event: any) {
        const value = event.value;

        switch (value) {
            case 'MY':
                this.filteredJobs = this.employeeJobs;
                break;
            case 'ALL':
                this.filteredJobs = this.availableJobs;
                break;
            case 'NEAR':
                if (this.userLocation.lat == 0) {
                    await navigator.geolocation.getCurrentPosition(
                        (position) => {
                            this.userLocation = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };
                        }
                    );
                }
                break;
            case 'SKILLS':
                this.filteredJobs = this.availableJobs.filter((job: Job) => {});
                break;
            default:
                break;
        }
    }

    // https://en.wikipedia.org/wiki/Haversine_formula

    getDistanceFromLatLonInKm(
        lat1: string,
        lon1: string,
        lat2: string,
        lon2: string
    ) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(+lat2 - +lat1); // deg2rad below
        var dLon = this.deg2rad(+lon2 - +lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(+lat1)) *
                Math.cos(this.deg2rad(+lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    deg2rad(deg: number) {
        return deg * (Math.PI / 180);
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    applyJob(job: Job) {
        this.applyJobDialog = true;
        this.job = { ...job };
    }

    confirmApply() {
        this.applyJobDialog = false;

        let jobUser: JobUserDto = {};
        jobUser.jobId = this.job._id;
        jobUser.userId = this.user._id;

        try {
            this.jobService
                .createJobUser(jobUser)
                .pipe(take(1))
                .subscribe((data: any) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'You applied to this job',
                        life: 3000,
                    });
                    alert('You applied to this job!');
                    console.log(data);
                });
        } catch (error) {
            alert('You already applied to this job');
        }
    }

    // confirmApply() {
    //     this.applyJobDialog = false;
    //     this.jobs = this.jobs.filter((val) => val._id !== this.job._id);
    //     this.job.status = 'PENDING';
    //     this.job.employee = this.user._id;
    //     this.jobService
    //         .updateJob(this.job)
    //         .pipe(take(1))
    //         .subscribe((job: any) => {
    //             console.log(job);
    //             this.loadJobs();
    //         });

    //     this.messageService.add({
    //         severity: 'success',
    //         summary: 'Successful',
    //         detail: 'You applied to this job',
    //         life: 3000,
    //     });
    //     this.job = {};
    // }

    viewJob(job: Job) {
        this.router.navigate(['/uikit/job-detail', { id: job._id }]);
    }
}
