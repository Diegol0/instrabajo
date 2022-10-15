import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudAddressComponent } from './crud-address.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CrudAddressComponent }
	])],
	exports: [RouterModule]
})
export class CrudAddressRoutingModule { }
