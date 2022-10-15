import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { InstrabajoService } from './services/instrabajo.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(
        private primengConfig: PrimeNGConfig,
        public instrabajoService: InstrabajoService
    ) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
