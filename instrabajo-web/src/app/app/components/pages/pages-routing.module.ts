import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud-address', loadChildren: () => import('./crud-address/crud-address.module').then(m => m.CrudAddressModule) },
        { path: 'crud-job', loadChildren: () => import('./crud-jobs/crud-job.module').then(m => m.CrudJobModule) },
        { path: 'crud-job-profile', loadChildren: () => import('./crud-job-profile/crud-job-profile.module').then(m => m.CrudJobProfileModule) },
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
