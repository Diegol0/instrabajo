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
  generalForm = new FormGroup({
    username: new FormControl({value: '', disabled: true}),
    name: new FormControl({value: '', disabled: true}, Validators.required),
    lastname: new FormControl({value: '', disabled: true}),
    phone: new FormControl({value: '+50248575945', disabled: true}, Validators.required),
    password: new FormControl({value: '', disabled: true}, Validators.required),
    email: new FormControl({value: '', disabled: true}, Validators.required),
    type: new FormControl({value: '', disabled: true}, Validators.required),

  });

  addressForm = new FormGroup({
    address1: new FormControl('18 calle 15-48 Z3'),
    address2: new FormControl('Vertical 3, Apto 408'),
    city: new FormControl('Guatemala'),
    country: new FormControl('Guatemala'),
  });

  paymentForm = new FormGroup({
    cardNumber: new FormControl('4578 1254 7456 7425'),
    expirationDate: new FormControl('12/27'),
    name: new FormControl('Diego Lopez'),
    ccv: new FormControl('123'),
  });

  constructor(private salukiService: SalukiService) {}

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
}
