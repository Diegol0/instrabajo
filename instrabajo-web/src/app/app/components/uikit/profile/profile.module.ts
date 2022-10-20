import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
    imports: [
        CommonModule,
        DropdownModule,
        FormsModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        ProfileRoutingModule
    ],
    declarations: [ProfileComponent]
})
export class ProfileModule { }
