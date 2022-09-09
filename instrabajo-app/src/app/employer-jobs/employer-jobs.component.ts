import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { JobDto } from '../models/service.dto';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-employer-jobs',
  templateUrl: './employer-jobs.component.html',
  styleUrls: ['./employer-jobs.component.scss'],
})
export class EmployerJobsComponent implements OnInit {
  @Input()
  userId: string = '';

  jobs: JobDto[] = [];

  constructor(private jobService: JobService,) {
    this.jobService
      .listAll()
      .pipe(take(1))
      .subscribe((data: any) => {
        if (data) {
          this.jobs = data;
          
        }
      });
  }

  ngOnInit(): void {}
}
