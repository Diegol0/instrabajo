import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryRoutingModule } from './registry-routing.module';
import { RegistryComponent } from './registry.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    imports: [
        CommonModule,
        RegistryRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        PasswordModule
    ],
    declarations: [RegistryComponent]
})
export class RegistryModule { }
