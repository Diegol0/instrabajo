import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AlertService } from '../alert.service';
import { CreateUserDto } from '../models/service.dto';
import { SalukiService } from '../services/saluki.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    username: new FormControl(''),
    name: new FormControl('', Validators.required),
    lastname: new FormControl(''),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  });
  constructor(
    private salukiService: SalukiService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  signup() {
    let user: CreateUserDto = this.signupForm.getRawValue()!;
    this.salukiService
      .signup(user)
      .pipe(take(1))
      .subscribe((data: any) => {
        if (data) {
          this.alertService.showAlert('User has been created');
          this.router.navigate(['login']);
        }
      });
  }
}
