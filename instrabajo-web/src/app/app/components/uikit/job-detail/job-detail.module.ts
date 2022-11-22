import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobDetailComponent } from './job-detail.component';
import { JobDetailRoutingModule } from './job-detail-routing.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SliderModule } from 'primeng/slider';
import { GMapModule } from 'primeng/gmap';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { GalleriaModule } from 'primeng/galleria';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        JobDetailRoutingModule,
        AutoCompleteModule,
        CalendarModule,
        ChipsModule,
        DropdownModule,
        InputMaskModule,
        InputNumberModule,
        ColorPickerModule,
        CascadeSelectModule,
        MultiSelectModule,
        ToggleButtonModule,
        SliderModule,
        InputTextareaModule,
        RadioButtonModule,
        InputTextModule,
        RatingModule,
        ChipModule,
        KnobModule,
        InputSwitchModule,
        ListboxModule,
        SelectButtonModule,
        CheckboxModule,
        ButtonModule,
        GMapModule,
        DividerModule,
        DialogModule,
        GalleriaModule,
        FileUploadModule,
        TableModule
    ],
    declarations: [JobDetailComponent],
})
export class JobDetailModule {}
