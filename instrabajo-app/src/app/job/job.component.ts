import { Component, OnInit } from '@angular/core';
import { forkJoin, map, Observable, take } from 'rxjs';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  filteredJobs: any[] = [];
  jobs: any[] = [];
  value: string = '';
  showImages: boolean = false;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobs = [];
  }

  filter() {
    if (this.value) {
      this.filteredJobs = this.jobs.filter((job) =>
        String(job.job).toLowerCase().includes(this.value.toLowerCase())
      );
    } else {
      this.filteredJobs = this.jobs;
    }
  }

  showAsImages() {
    if (this.showImages) {
      let obs: Observable<any>[] = new Array();
      this.jobs.forEach((job) => {
        obs.push(
          this.jobService
            .getSingleJobImage(String(job.job).toLowerCase())
            .pipe(map((value) => ({ type: job.job, value: value })))
        );
      });
      forkJoin(obs).subscribe((data: any) => {
        this.jobs = [];
        data.forEach((d: any) => {
          this.jobs.push({
            job: d.type,
            img: d.value.message,
          });
        });
        this.filteredJobs = this.jobs;
      });
      this.value = '';
    }
  }
}
