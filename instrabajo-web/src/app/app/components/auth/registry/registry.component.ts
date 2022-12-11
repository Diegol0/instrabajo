import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { CreateUserDto } from 'src/app/app/models/service.dto';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { InstrabajoService } from 'src/app/services/instrabajo.service';

@Component({
    selector: 'app-registry',
    templateUrl: './registry.component.html',
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
export class RegistryComponent {
    registryForm = new FormGroup({
        username: new FormControl(''),
        name: new FormControl('', Validators.required),
        lastname: new FormControl(''),
        password: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
    });

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(
        public layoutService: LayoutService,
        private instrabajoService: InstrabajoService,
        private router: Router
    ) {}

    registry() {
        
        let user: CreateUserDto = this.registryForm.getRawValue()!;

        

        this.instrabajoService
            .signup(user)
            .pipe(take(1))
            .subscribe((data: any) => {
                if (data) {
                    alert('Usuario creado exitosamente!');
                    this.router.navigate(['auth/login']);
                }
            });
    }
}
