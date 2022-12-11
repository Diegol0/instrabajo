import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { CompareDto, UpdateUserDto } from 'src/app/app/models/service.dto';
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
                this.user.photo = data.payload.url;
                this.save();
            });
    }

    onIdUpload(event: any) {
        this.instrabajoService
            .saveUserPhoto(event.files[0])
            .pipe(take(1))
            .subscribe(async (data: any) => {
                this.user.dpi = data.payload.url;

                this.compare(this.user.dpi);

                if (event.files[0].name == 'DPI CR.png') {
                } else {
                }
                this.user.id = data.payload.url;
            });
    }

    compare(dpi: string) {
        let compare: CompareDto = {
            source: this.user.photo,
            target: dpi,
        };

        this.instrabajoService
            .compare(compare)
            .pipe(take(1))
            .subscribe((data: any) => {
                console.log(data);
                this.user.dpi = dpi;
                if (
                    data.payload.FaceMatches &&
                    data.payload.FaceMatches.length > 0
                ) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Exito',
                        detail: 'Felicidades, has sido verificado',
                        life: 3000,
                        sticky: true,
                    });
                    this.user.isVerified = true;
                    this.save();
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Lo sentimos, no hemos podido verificar tu perfil, puedes contactar a admin@instrabajo.com',
                        life: 3000,
                        sticky: true,
                    });
                    this.user.isVerified = false;
                    this.save();
                }
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
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exito',
                    detail: 'Usuario actualizado',
                    life: 3000,
                    sticky: true,
                });
            });
    }
}
