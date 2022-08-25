import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { UserDto } from '../models/service.dto';

import { SalukiService } from '../services/saluki.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: UserDto | null = null;
  displayNameBreed: string | null = null;
  img: string | null = null;
  constructor(private salukiService: SalukiService) {
    this.salukiService.getLoggedUser.pipe(take(1)).subscribe((user: any) => {
      this.user = user;
    });
  }

  ngOnInit(): void {}
}
