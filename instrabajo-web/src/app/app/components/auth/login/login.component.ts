import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { LoginUserDto } from 'src/app/app/models/service.dto';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { InstrabajoService } from 'src/app/services/instrabajo.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(
        public layoutService: LayoutService,
        private instrabajoService: InstrabajoService,
        private router: Router
    ) {}

    login() {
        let user: LoginUserDto = this.loginForm.getRawValue()!;
        this.instrabajoService
            .login(user)
            .pipe(take(1))
            .subscribe((data: any) => {
                if (data) {
                    this.instrabajoService.setLoggedIn(true);
                    localStorage.setItem('token', data.access_token);
                    this.instrabajoService.setLoggedUser(data.user);
                    this.router.navigate(['/']);
                }
            });
    }
}
