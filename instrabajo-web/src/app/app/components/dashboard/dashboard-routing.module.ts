import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent,
                canActivate: [AuthGuard],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class DashboardsRoutingModule {}
