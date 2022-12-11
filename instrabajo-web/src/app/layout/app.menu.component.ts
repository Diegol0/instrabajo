import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    {
                        label: 'Panel',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },
                ],
            },
            {
                label: 'Carrera',
                items: [
                    {
                        label: 'Trabajos',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/uikit/job-list'],
                    },
                    {
                        label: 'Reseñas',
                        icon: 'pi pi-fw pi-star',
                        routerLink: ['/uikit/review'],
                    },
                    {
                        label: 'Perfil trabajos',
                        icon: 'pi pi-fw pi-inbox',
                        routerLink: ['/pages/crud-job-profile'],
                    },
                ],
            },

            {
                label: 'Administración',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Mis direcciones',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud-address'],
                    },
                    {
                        label: 'Mis trabajos creados',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud-job'],
                    },
                ],
            },
        ];
    }
}
