import { Component, Input, OnInit } from '@angular/core';
import { JobDto } from '../models/service.dto';

@Component({
  selector: 'app-employer-jobs',
  templateUrl: './employer-jobs.component.html',
  styleUrls: ['./employer-jobs.component.scss'],
})
export class EmployerJobsComponent implements OnInit {
  @Input()
  userId: string = '';

  jobs: JobDto[] = [];

  constructor() {}

  ngOnInit(): void {}
}
