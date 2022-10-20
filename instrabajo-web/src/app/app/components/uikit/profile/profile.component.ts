import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { InstrabajoService } from 'src/app/services/instrabajo.service';

@Component({
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
    
    user: any = {};
    
    constructor(public instrabajoService: InstrabajoService) {
        this.instrabajoService.getLoggedUser
            .pipe(take(1))
            .subscribe((user: any) => {
                this.user = user;
                console.log(user)
            });
    }

    ngOnInit(): void {
    }

    selectedState: any;

    dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' },
    ];
}
