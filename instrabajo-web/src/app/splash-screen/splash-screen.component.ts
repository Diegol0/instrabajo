import { Component, OnInit } from '@angular/core';
import { SplashScreenService } from '../services/splash-screen.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit {
  public opacityChange = 1;
  public splashTransition: string = '';

  public showSplash = true;
  readonly ANIMATION_DURATION = 1;
  constructor(private splashScreenStateService: SplashScreenService) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.splashScreenStateService.stop();
    }, 500);
    this.splashScreenStateService.subscribe((res: void) => {
      this.hideSplashAnimation();
    });
  }
  private hideSplashAnimation() {
    this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
    this.opacityChange = 0;
    setTimeout(() => {
      this.showSplash = !this.showSplash;
    }, 250);
  }
}
