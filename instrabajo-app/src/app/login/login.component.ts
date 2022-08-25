import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AlertService } from '../alert.service';
import { LoginUserDto } from '../models/service.dto';
import { SalukiService } from '../services/saluki.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private salukiService: SalukiService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  login() {
    let user: LoginUserDto = this.loginForm.getRawValue()!;
    this.salukiService
      .login(user)
      .pipe(take(1))
      .subscribe((data: any) => {
        if (data) {
          this.salukiService.setLoggedIn(true);
          localStorage.setItem('token', data.access_token);
          this.salukiService.setLoggedUser(data.user);
          this.router.navigate(['home']);
        }
      });
  }
}
