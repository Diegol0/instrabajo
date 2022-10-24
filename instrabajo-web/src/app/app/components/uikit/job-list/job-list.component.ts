import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Job } from 'src/app/app/api/job';
import { JobImageService } from 'src/app/app/service/job-image.service';
import { JobService } from 'src/app/app/service/job.service';

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

    constructor(
        private jobService: JobService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        private jobImagesService: JobImageService,
    ) {}

    ngOnInit() {
        this.jobService.getJobs().then((data) => (this.jobs = data));

        this.sortOptions = [
            { label: 'My Jobs', value: 'MY' },
            { label: 'All Jobs', value: 'ALL' },
            { label: 'Jobs near me', value: 'NEAR' },
            { label: 'Jobs with my skills', value: 'SKILLS' },
        ];
    }

    onSortChange(event: any) {
        const value = event.value;

        switch (value) {
            case 'MY':
                break;
            case 'ALL':
                break;
            case 'NEAR':
                break;
            case 'SKILLS':
                break;
            default:
                break;
        }

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
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
        this.jobs = this.jobs.filter((val) => val.id !== this.job.id);
        this.job.status = 'PENDING';
        this.jobs.push(this.job);
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'You applied to this job',
            life: 3000,
        });
        this.job = {};
    }

    viewJob(job: Job) {
        this.router.navigate(['/uikit/job-detail', { id: job.id }]);
    }
}
