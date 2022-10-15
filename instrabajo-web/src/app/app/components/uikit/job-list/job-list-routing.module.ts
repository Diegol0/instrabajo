import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JobListComponent } from './job-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: JobListComponent }
    ])],
    exports: [RouterModule]
})
export class JobListRoutingModule { }
