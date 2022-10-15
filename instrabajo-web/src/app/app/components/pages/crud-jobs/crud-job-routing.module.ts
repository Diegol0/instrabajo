import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudJobComponent } from './crud-job.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CrudJobComponent }
	])],
	exports: [RouterModule]
})
export class CrudJobRoutingModule { }
