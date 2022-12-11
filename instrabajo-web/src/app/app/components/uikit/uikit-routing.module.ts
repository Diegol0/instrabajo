import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },
        { path: 'job-list', loadChildren: () => import('./job-list/job-list.module').then(m => m.JobListModule), canActivate: [AuthGuard] },
        { path: 'job-detail', loadChildren: () => import('./job-detail/job-detail.module').then(m => m.JobDetailModule), canActivate: [AuthGuard] },
        { path: 'review', loadChildren: () => import('./review/review.module').then(m => m.ReviewModule), canActivate: [AuthGuard] },
        
    ])],
    exports: [RouterModule]
})
export class UikitRoutingModule { }
