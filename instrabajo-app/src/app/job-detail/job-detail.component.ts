import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AlertService } from '../alert.service';
import { JobDto, UserDto } from '../models/service.dto';
import { JobService } from '../services/job.service';
import { SalukiService } from '../services/saluki.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  marker: google.maps.Marker = new google.maps.Marker();
  user: UserDto | null = null;
  lat: string = '';
  lng: string = '';
  jobForm = new FormGroup({
    name: new FormControl('', Validators.required),
    rate: new FormControl('', Validators.required),
    address: new FormGroup({
      addressLine1: new FormControl('', Validators.required),
      addressLine2: new FormControl(''),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      lat: new FormControl(''),
      lng: new FormControl(''),
    }),
  });
  constructor(
    private salukiService: SalukiService,
    private router: Router,
    private jobService: JobService,
    private alertService: AlertService
  ) {
    this.salukiService.getLoggedUser.pipe(take(1)).subscribe((user: any) => {
      this.user = user;
    });
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.marker.setDraggable(true);
      this.marker.setPosition(this.center);
    });
  }

  ngOnInit(): void {}

  save() {
    if (!this.jobForm.valid) {
      this.alertService.showAlert('Debes llenar los campos obligatorios.');
      return;
    }

    // this.alertService.showAlert(
    //   'Por favor selecciona la ubicación en el mapa.'
    // );
    // return;

    let job: JobDto = this.jobForm.getRawValue()!;
    job.employerId = this.user?._id;
    this.jobService
      .createJob(job)
      .pipe(take(1))
      .subscribe((data: any) => {
        if (data) {
          this.alertService.showAlert('El trabajo ha sido creado.');
          this.router.navigate(['home']);
        }
      });
  }
}
