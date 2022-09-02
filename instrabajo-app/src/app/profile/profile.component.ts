import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { SalukiService } from '../services/saluki.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  srcResult: any;
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  generalForm = new FormGroup({
    username: new FormControl({ value: '', disabled: true }),
    name: new FormControl({ value: '', disabled: true }, Validators.required),
    lastname: new FormControl({ value: '', disabled: true }),
    phone: new FormControl(
      { value: '+50248575945', disabled: true },
      Validators.required
    ),
    password: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    type: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  addressForm = new FormGroup({
    address1: new FormControl('37 Av A 12-49'),
    address2: new FormControl('Alamedas de Yumar 2 Zona 6 de Mixco'),
    city: new FormControl('Guatemala'),
    country: new FormControl('Guatemala'),
  });

  paymentForm = new FormGroup({
    cardNumber: new FormControl('4578 1254 7456 7425'),
    expirationDate: new FormControl('12/27'),
    name: new FormControl('Diego Lopez'),
    ccv: new FormControl('123'),
  });

  constructor(private salukiService: SalukiService) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  ngOnInit(): void {
    this.salukiService.getLoggedUser.pipe(take(1)).subscribe((user: any) => {
      this.generalForm.patchValue(user);
    });
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
        console.log(e)
        
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
