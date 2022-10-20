import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { UpdateUserDto } from 'src/app/app/models/service.dto';
import { InstrabajoService } from 'src/app/services/instrabajo.service';
declare var google: any;
@Component({
    templateUrl: './profile.component.html',
    providers: [MessageService],
})
export class ProfileComponent implements OnInit {
    user: any = {};
    options: any;
    center = { lat: 0, lng: 0 };
    overlays: any[] = [];

    constructor(
        public instrabajoService: InstrabajoService,
        public messageService: MessageService
    ) {
        this.instrabajoService.getLoggedUser
            .pipe(take(1))
            .subscribe((user: any) => {
                this.user = user;
                console.log(user);
            });
    }

    ngOnInit(): void {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            this.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            this.center = { lat: this.center.lat!, lng: this.center.lng! };
            this.overlays = [
                new google.maps.Marker({
                    position: this.center,
                    title: 'You are here',
                }),
            ];
            this.options = {
                center: { lat: this.center.lat, lng: this.center.lng },
                zoom: 12,
            };
        });
    }

    onBasicUpload(event: any) {
        this.instrabajoService
            .saveUserPhoto(event.files[0])
            .pipe(take(1))
            .subscribe((data: any) => {
                console.log(data);
                this.user.photo =  data.payload.url;
                this.save();
            });
        
    }

    save() {
        let user: UpdateUserDto = {
            _id: this.user?._id,
            phone: this.user.phone,
            photo: this.user.photo,
        };

        this.instrabajoService
            .updateUser(user)
            .pipe(take(1))
            .subscribe((data: any) => {
                console.log(data);
                alert('User updated!');
                this.messageService.add({
                    severity: 'info',
                    summary: 'Success',
                    detail: 'User updated',
                });
            });
    }

    selectedState: any;

    dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' },
    ];
}
