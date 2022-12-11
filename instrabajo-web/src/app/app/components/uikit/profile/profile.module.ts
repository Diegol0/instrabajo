import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { GMapModule } from 'primeng/gmap';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
    imports: [
        CommonModule,
        DropdownModule,
        FormsModule,
        ToastModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        ProfileRoutingModule,
        GMapModule,
        FileUploadModule,
    ],
    declarations: [ProfileComponent],
})
export class ProfileModule {}
