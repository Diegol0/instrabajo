import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudJobProfileComponent } from './crud-job-profile.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CrudJobProfileComponent }
	])],
	exports: [RouterModule]
})
export class CrudJobProfileRoutingModule { }
